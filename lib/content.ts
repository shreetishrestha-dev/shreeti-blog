import { featuredPhotographyNotes } from "@/content/site-content";
import { getStoredEntries, getStoredEntryBySlug } from "@/lib/content-store";
import { getInstagramPhotography, getInstagramProfileCards } from "@/lib/instagram";
import type { HomeData } from "@/lib/types";

export async function getHomeData(): Promise<HomeData> {
  const [entries, photography, instagramCards] = await Promise.all([
    getStoredEntries(),
    getInstagramPhotography(),
    getInstagramProfileCards(),
  ]);

  const poems = entries.filter((entry) => entry.category === "poem");
  const articles = entries.filter((entry) => entry.category === "article");
  const photos = photography.length ? photography : featuredPhotographyNotes;

  return {
    poems,
    articles,
    photography: photos,
    instagramCards,
  };
}

export async function getAllEntries() {
  return getStoredEntries();
}

export async function getEntryBySlug(slug: string) {
  return getStoredEntryBySlug(slug);
}
