import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const urlsFile = path.join(root, "content", "instagram-poem-post-urls.txt");
const outputFile = path.join(root, "content", "instagram-poems.generated.json");

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function decodeHtml(value) {
  return value
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function excerptFromParagraphs(paragraphs, maxLength = 148) {
  const joined = paragraphs.join(" ").trim();
  if (joined.length <= maxLength) return joined;
  return `${joined.slice(0, maxLength).trimEnd()}...`;
}

function isProbablyPoem(text) {
  const lower = text.toLowerCase();
  const lineBreakHints = (text.match(/[|•]/g) || []).length;

  return (
    lower.includes("#poetry") ||
    lower.includes("#poem") ||
    lower.includes("poetry") ||
    lower.includes("poem") ||
    lineBreakHints >= 2
  );
}

async function fetchInstagramMeta(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const html = await response.text();
  const title = html.match(/property="og:title" content="([^"]+)"/)?.[1] ?? "Instagram";
  const description =
    html.match(/property="og:description" content="([^"]+)"/)?.[1] ??
    html.match(/name="description" content="([^"]+)"/)?.[1] ??
    "";
  const imageUrl = html.match(/property="og:image" content="([^"]+)"/)?.[1];

  return {
    title: decodeHtml(title),
    description: decodeHtml(description),
    imageUrl: imageUrl ? decodeHtml(imageUrl) : undefined,
    url,
  };
}

function toPoemEntry(meta) {
  const title = meta.title.split(" on Instagram: ")[0] || "Poem";
  const normalized = meta.description
    .replace(/\s+#/g, " | #")
    .replace(/\.(?=\s+[A-Z#"])/g, ".|");

  const content = normalized
    .split("|")
    .map((part) => stripHtml(part))
    .filter(Boolean)
    .slice(0, 12);

  return {
    slug: slugify(`${title}-${meta.url}`),
    title,
    excerpt: excerptFromParagraphs(content),
    content,
    category: "poem",
    tags: ["instagram", "poetry"],
    publishedAt: new Date().toISOString(),
    sourceLabel: "Instagram import",
    sourceUrl: meta.url,
    coverImage: meta.imageUrl,
    featured: true,
  };
}

async function main() {
  const raw = await fs.readFile(urlsFile, "utf8");
  const urls = raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

  const imported = [];

  for (const url of urls) {
    try {
      const meta = await fetchInstagramMeta(url);
      if (isProbablyPoem(meta.description)) {
        imported.push(toPoemEntry(meta));
      }
    } catch (error) {
      console.error(`[instagram-import] ${String(error)}`);
    }
  }

  await fs.writeFile(outputFile, `${JSON.stringify(imported, null, 2)}\n`);
  console.log(`Imported ${imported.length} poem post(s) into ${path.relative(root, outputFile)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
