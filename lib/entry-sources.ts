import firebaseSurprisePoems from "@/content/firebase-surprise-poems.generated.json";
import instagramPoems from "@/content/instagram-poems.generated.json";
import { manualArticles, manualPoems } from "@/content/site-content";
import type { CreativeEntry } from "@/lib/types";

function dedupeEntries(entries: CreativeEntry[]) {
  const seen = new Set<string>();

  return entries.filter((entry) => {
    const dedupeKey = `${entry.title.trim().toLowerCase()}::${entry.content.join("\n\n").trim().toLowerCase()}`;

    if (seen.has(dedupeKey)) {
      return false;
    }

    seen.add(dedupeKey);
    return true;
  });
}

export function getManualPoems(): CreativeEntry[] {
  return manualPoems.map((poem) => ({
    slug: poem.slug,
    title: poem.title,
    excerpt: poem.excerpt,
    content: poem.lines,
    category: "poem" as const,
    tags: poem.tags,
    publishedAt: poem.publishedAt,
    sourceLabel: poem.sourceLabel,
    featured: true,
  }));
}

export function getGeneratedInstagramPoems(): CreativeEntry[] {
  return instagramPoems as CreativeEntry[];
}

export function getFirebaseSurprisePoems(): CreativeEntry[] {
  return firebaseSurprisePoems as CreativeEntry[];
}

export function getPoemEntries(): CreativeEntry[] {
  const generatedPoems = dedupeEntries([
    ...getGeneratedInstagramPoems(),
    ...getFirebaseSurprisePoems(),
  ]);

  return generatedPoems.length ? generatedPoems : getManualPoems();
}

export function getManualArticles(): CreativeEntry[] {
  return manualArticles.map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.paragraphs,
    category: "article" as const,
    tags: article.tags,
    publishedAt: article.publishedAt,
    sourceLabel: article.sourceLabel,
    sourceUrl: article.sourceUrl,
    featured: true,
  }));
}

export function getLocalEntries(): CreativeEntry[] {
  return [...getPoemEntries(), ...getManualArticles()];
}
