import instagramPoems from "@/content/instagram-poems.generated.json";
import { manualPoems } from "@/content/site-content";
import type { CreativeEntry } from "@/lib/types";

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

export function getPoemEntries(): CreativeEntry[] {
  const generatedPoems = getGeneratedInstagramPoems();
  return generatedPoems.length ? generatedPoems : getManualPoems();
}
