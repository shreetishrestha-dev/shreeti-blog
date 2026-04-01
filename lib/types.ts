export type EntryCategory = "poem" | "article";

export type CreativeEntry = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: EntryCategory;
  tags: string[];
  publishedAt: string;
  sourceLabel: string;
  sourceUrl?: string;
  coverImage?: string;
  featured?: boolean;
};

export type PhotoItem = {
  id: string;
  title: string;
  alt: string;
  imageUrl: string;
  caption: string;
  photographerName?: string;
  username?: string;
  profileImageUrl?: string;
  publishedAt?: string;
  postUrl?: string;
};

export type InstagramCard = {
  id: string;
  title: string;
  caption: string;
  imageUrl?: string;
  profileImageUrl?: string;
  username?: string;
  url: string;
  kind: "profile" | "post";
};

export type HomeData = {
  poems: CreativeEntry[];
  articles: CreativeEntry[];
  photography: PhotoItem[];
  instagramCards: InstagramCard[];
};
