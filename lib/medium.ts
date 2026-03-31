import Parser from "rss-parser";

import { siteConfig } from "@/content/site-content";
import type { CreativeEntry } from "@/lib/types";
import { excerptFromParagraphs, slugify, stripHtml } from "@/lib/utils";

type MediumItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  content?: string;
  contentSnippet?: string;
  categories?: string[];
};

export async function getMediumArticles(): Promise<CreativeEntry[]> {
  if (!siteConfig.mediumFeedUrl) return [];

  const parser = new Parser<Record<string, never>, MediumItem>();

  try {
    const feed = await parser.parseURL(siteConfig.mediumFeedUrl);

    return (feed.items ?? []).slice(0, 8).map((item, index) => {
      const content = stripHtml(item.content || item.contentSnippet || "");
      const paragraphs = content
        .split(/(?<=[.!?])\s+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .slice(0, 8);

      return {
        slug: slugify(item.title || `medium-${index}`),
        title: item.title || "Medium story",
        excerpt: excerptFromParagraphs(paragraphs),
        content: paragraphs,
        category: "article",
        tags: item.categories ?? ["medium"],
        publishedAt: item.pubDate || new Date().toISOString(),
        sourceLabel: "Medium RSS",
        sourceUrl: item.link,
      };
    });
  } catch {
    return [];
  }
}
