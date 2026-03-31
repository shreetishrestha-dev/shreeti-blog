import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const exportFile =
  "/Users/shreetishrestha/Downloads/Serendipitous Soul Account Settings/your_instagram_activity/media/posts_1.json";
const outputFile = path.join(root, "content", "instagram-poems.generated.json");

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

function excerptFromParagraphs(paragraphs, maxLength = 160) {
  const joined = paragraphs.join(" ").trim();
  if (joined.length <= maxLength) return joined;
  return `${joined.slice(0, maxLength).trimEnd()}...`;
}

function getCaption(post) {
  return normalizeText(
    post.title || post.media?.find((item) => item.title)?.title || "",
  );
}

function getPublishedAt(post) {
  const rawTimestamp =
    post.creation_timestamp ??
    post.media?.find((item) => item.creation_timestamp)?.creation_timestamp;

  if (typeof rawTimestamp === "number") {
    const date = new Date(rawTimestamp * 1000);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  if (typeof rawTimestamp === "string" && rawTimestamp.trim()) {
    const numericTimestamp = Number(rawTimestamp);
    const date = Number.isNaN(numericTimestamp)
      ? new Date(rawTimestamp)
      : new Date(numericTimestamp * 1000);

    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  return null;
}

function getTitle(caption) {
  const lines = caption
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const firstLine =
    lines.find((line) => /[\p{L}\p{N}]/u.test(line)) ??
    lines.find((line) => /[A-Za-z0-9]/.test(line)) ??
    lines[0];

  if (!firstLine) return "Instagram Poem";
  if (firstLine.length <= 56) return firstLine;

  return firstLine.split(/\s+/).slice(0, 6).join(" ");
}

function getParagraphs(caption) {
  return caption
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => paragraph.replace(/\n/g, "\n"));
}

function getTags(caption) {
  return [...caption.matchAll(/#([a-z0-9_]+)/gi)].map((match) => match[1].toLowerCase());
}

function looksLikePoem(caption) {
  if (!caption) return false;

  const hashtags = getTags(caption);
  const bodyWithoutTags = caption.replace(/#[a-z0-9_]+/gi, "").trim();
  const lines = bodyWithoutTags.split("\n").map((line) => line.trim()).filter(Boolean);
  const avgLineLength =
    lines.reduce((total, line) => total + line.length, 0) / Math.max(lines.length, 1);

  return (
    hashtags.some((tag) => tag.includes("poem") || tag.includes("poetry")) ||
    lines.length >= 8 ||
    (lines.length >= 5 && avgLineLength <= 58)
  );
}

async function main() {
  const raw = await fs.readFile(exportFile, "utf8");
  const posts = JSON.parse(raw);

  const poems = posts
    .map((post) => {
      const caption = getCaption(post);
      if (!looksLikePoem(caption)) return null;

      const publishedAt = getPublishedAt(post);
      if (!publishedAt) return null;

      const paragraphs = getParagraphs(caption);
      const hashtags = getTags(caption);

      return {
        slug: slugify(`${getTitle(caption)}-${publishedAt}`),
        title: getTitle(caption),
        excerpt: excerptFromParagraphs(paragraphs),
        content: paragraphs,
        category: "poem",
        tags: ["instagram", ...hashtags.filter((tag) => tag !== "instagram").slice(0, 8)],
        publishedAt,
        sourceLabel: "Instagram export",
        featured: true,
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  await fs.writeFile(outputFile, `${JSON.stringify(poems, null, 2)}\n`);
  console.log(`Imported ${poems.length} poem post(s) from export into ${path.relative(root, outputFile)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
