import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const exportRoot = "/Users/shreetishrestha/Downloads/Shreeti Instagram Settings Apr 2026";
const postsFile = path.join(exportRoot, "your_instagram_activity", "media", "posts_1.json");
const profilePhotosFile = path.join(
  exportRoot,
  "your_instagram_activity",
  "media",
  "profile_photos.json",
);
const publicOutputDir = path.join(root, "public", "imported-photography");
const jsonOutputFile = path.join(root, "content", "instagram-photography.generated.json");

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function fixMojibake(value) {
  try {
    return Buffer.from(value, "latin1").toString("utf8");
  } catch {
    return value;
  }
}

function normalizeText(value) {
  return fixMojibake(value)
    .replace(/\r\n/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function getCaption(post, mediaItem) {
  return normalizeText(post.title || mediaItem.title || "");
}

function getTitle(caption, fallback) {
  const firstLine = caption
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line && /[\p{L}\p{N}]/u.test(line));

  if (!firstLine) return fallback;
  if (firstLine.length <= 64) return firstLine;
  return firstLine.split(/\s+/).slice(0, 8).join(" ");
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyOrConvertMedia(sourcePath, outputBaseName) {
  const extension = path.extname(sourcePath).toLowerCase();
  const targetFileName =
    extension === ".heic" || extension === ".heif"
      ? `${outputBaseName}.jpg`
      : `${outputBaseName}${extension || ".jpg"}`;
  const targetPath = path.join(publicOutputDir, targetFileName);

  if (extension === ".heic" || extension === ".heif") {
    const result = spawnSync("sips", ["-s", "format", "jpeg", sourcePath, "--out", targetPath], {
      stdio: "pipe",
    });

    if (result.status !== 0) {
      throw new Error(
        `Failed to convert HEIC file ${sourcePath}: ${result.stderr.toString() || result.stdout.toString()}`,
      );
    }
  } else {
    await fs.copyFile(sourcePath, targetPath);
  }

  return `/imported-photography/${targetFileName}`;
}

async function importProfilePhoto() {
  try {
    const raw = await fs.readFile(profilePhotosFile, "utf8");
    const data = JSON.parse(raw);
    const profile = data.ig_profile_picture?.[0];
    if (!profile?.uri) return undefined;

    const sourcePath = path.join(exportRoot, profile.uri);
    return await copyOrConvertMedia(sourcePath, "profile-photo");
  } catch {
    return undefined;
  }
}

async function main() {
  await ensureDir(publicOutputDir);

  const raw = await fs.readFile(postsFile, "utf8");
  const posts = JSON.parse(raw);
  const profileImageUrl = await importProfilePhoto();

  const photos = [];

  for (const post of posts) {
    const mediaItems = Array.isArray(post.media) ? post.media : [];
    const postTimestamp =
      post.creation_timestamp ??
      mediaItems.find((item) => item.creation_timestamp)?.creation_timestamp;

    for (let index = 0; index < mediaItems.length; index += 1) {
      const mediaItem = mediaItems[index];
      if (!mediaItem?.uri) continue;

      const extension = path.extname(mediaItem.uri).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"].includes(extension)) continue;

      const sourcePath = path.join(exportRoot, mediaItem.uri);
      const caption = getCaption(post, mediaItem);
      const fallbackTitle = `Photo ${photos.length + 1}`;
      const title = getTitle(caption, fallbackTitle);
      const baseName = `${
        slugify(`${title}-${postTimestamp ?? mediaItem.creation_timestamp ?? index}-${index}`) ||
        `photo-${photos.length + 1}-${index}`
      }`;
      const imageUrl = await copyOrConvertMedia(sourcePath, baseName);

      photos.push({
        id: `${baseName}-${index}`,
        title,
        alt: caption || title,
        imageUrl,
        caption,
        publishedAt:
          typeof (postTimestamp ?? mediaItem.creation_timestamp) === "number"
            ? new Date((postTimestamp ?? mediaItem.creation_timestamp) * 1000).toISOString()
            : undefined,
        username: "shreeti_nmzz",
        photographerName: "Shreeti",
        profileImageUrl,
      });
    }
  }

  photos.sort((a, b) => {
    if (!a.publishedAt && !b.publishedAt) return 0;
    if (!a.publishedAt) return 1;
    if (!b.publishedAt) return -1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  await fs.writeFile(jsonOutputFile, `${JSON.stringify(photos, null, 2)}\n`);
  console.log(
    `Imported ${photos.length} photography item(s) into ${path.relative(root, jsonOutputFile)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
