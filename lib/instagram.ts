import { siteConfig } from "@/content/site-content";
import generatedPhotography from "@/content/instagram-photography.generated.json";
import type { InstagramCard, PhotoItem } from "@/lib/types";
import { decodeHtml, slugify } from "@/lib/utils";

type InstagramMeta = {
  title: string;
  description: string;
  imageUrl?: string;
  profileImageUrl?: string;
  username?: string;
  url: string;
};

async function fetchInstagramMeta(url: string): Promise<InstagramMeta | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const html = await response.text();
    const title = html.match(/property="og:title" content="([^"]+)"/)?.[1] ?? "Instagram";
    const description =
      html.match(/property="og:description" content="([^"]+)"/)?.[1] ??
      html.match(/name="description" content="([^"]+)"/)?.[1] ??
      "";
    const imageUrl = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    const username =
      html.match(/"username":"([^"]+)"/)?.[1] ??
      html.match(/"alternateName":"@?([^"]+)"/)?.[1] ??
      url.match(/instagram\.com\/([^/?#]+)/)?.[1];
    const profileImageUrl =
      html.match(/"profile_pic_url_hd":"([^"]+)"/)?.[1] ??
      html.match(/"profile_pic_url":"([^"]+)"/)?.[1] ??
      imageUrl;

    return {
      title: decodeHtml(title),
      description: decodeHtml(description),
      imageUrl: imageUrl ? decodeHtml(imageUrl) : undefined,
      profileImageUrl: profileImageUrl ? decodeHtml(profileImageUrl.replace(/\\u0026/g, "&")) : undefined,
      username: username ? decodeHtml(username.replace(/^@/, "")) : undefined,
      url,
    };
  } catch {
    return null;
  }
}

export async function getInstagramProfileCards(): Promise<InstagramCard[]> {
  const poemProfileUrl = `https://www.instagram.com/${siteConfig.instagram.poemsHandle}/`;
  const photographyProfileUrl = `https://www.instagram.com/${siteConfig.instagram.photographyHandle}/`;

  const [poemProfile, photographyProfile] = await Promise.all([
    fetchInstagramMeta(poemProfileUrl),
    fetchInstagramMeta(photographyProfileUrl),
  ]);

  return [poemProfile, photographyProfile]
    .filter((item): item is InstagramMeta => Boolean(item))
    .map((item) => ({
      id: slugify(item.url),
      title: item.title.replace(" • Instagram photos and videos", ""),
      caption: item.description,
      imageUrl: item.imageUrl,
      profileImageUrl: item.profileImageUrl,
      username: item.username,
      url: item.url,
      kind: "profile" as const,
    }));
}

export async function getInstagramPhotography(): Promise<PhotoItem[]> {
  const importedPhotography = generatedPhotography as PhotoItem[];
  if (importedPhotography.length) return importedPhotography;

  const entries = await Promise.all(
    siteConfig.instagram.photographyPostUrls.map((url) => fetchInstagramMeta(url)),
  );

  return entries
    .filter((item): item is InstagramMeta => Boolean(item))
    .filter((item) => Boolean(item.imageUrl))
    .map((item, index) => ({
      id: `${slugify(item.title)}-${index}`,
      title: item.title.split(" on Instagram: ")[0] || "Photography",
      alt: item.description || "Instagram photography",
      imageUrl: item.imageUrl ?? "",
      caption: item.description,
      postUrl: item.url,
    }));
}
