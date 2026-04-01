import fs from "node:fs/promises";
import path from "node:path";

const inputFile =
  "/Users/shreetishrestha/Library/Caches/com.apple.SwiftUI.Drag-58506FE6-B09D-4895-9360-8B7494CADCF4/Firebase Surprise Data.json";
const outputFile = path.join(process.cwd(), "content", "firebase-surprise-poems.generated.json");

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0900-\u097F]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function htmlToParagraphs(value) {
  const normalized = decodeHtml(value)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<p[^>]*>/gi, "")
    .replace(/<\/p>/gi, "")
    .replace(/<span[^>]*>/gi, "")
    .replace(/<\/span>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .trim();

  return normalized
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function excerptFromParagraphs(paragraphs, maxLength = 160) {
  const joined = paragraphs.join(" ").trim();
  if (joined.length <= maxLength) return joined;
  return `${joined.slice(0, maxLength).trimEnd()}...`;
}

function parseCreatedAt(value) {
  const sanitized = value.replace(/\s*UTC[+-]\d+:\d+$/, "").replace(/\u202f/g, " ");
  const date = new Date(sanitized);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

async function main() {
  const raw = JSON.parse(await fs.readFile(inputFile, "utf8"));
  const entries = raw.map((item) => {
    const content = htmlToParagraphs(item.poemText || "");
    const title = (item.title || "Untitled").trim();
    const publishedAt = parseCreatedAt(item.createdAt || "");
    const slugBase = slugify(`${title}-${publishedAt}`) || `firebase-poem-${item.id}`;

    return {
      slug: slugBase,
      title,
      excerpt: excerptFromParagraphs(content),
      content,
      category: "poem",
      tags: ["firebase", "poetry", "archive"],
      publishedAt,
      sourceLabel: "Firebase Surprise archive",
      coverImage: item.photoURL || undefined,
      featured: true,
    };
  });

  await fs.writeFile(outputFile, `${JSON.stringify(entries, null, 2)}\n`);
  console.log(`Imported ${entries.length} Firebase poem(s) into ${path.relative(process.cwd(), outputFile)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
