export const siteConfig = {
  title: "Serendipitous Soul",
  subtitle: "A playful home for poems, photographs, articles, and fragments from Instagram.",
  intro:
    "Part gallery, part poem wall, part editorial scrapbook for things worth lingering with.",
  mediumFeedUrl:
    process.env.MEDIUM_FEED_URL || process.env.NEXT_PUBLIC_MEDIUM_FEED_URL || "",
  instagram: {
    poemsHandle: "serendipitoussoul",
    photographyHandle: "shreeti_nmzz",
    photographyPostUrls: [] as string[],
  },
};

export const manualPoems = [
  {
    slug: "manual-open-window",
    title: "Open Window",
    excerpt: "A placeholder poem space for manual additions when Instagram is being difficult.",
    lines: [
      "Leave a window open for the poems that arrive without warning.",
      "This space already knows how to hold them softly.",
    ],
    tags: ["manual", "poetry"],
    publishedAt: "2026-03-31",
    sourceLabel: "Manual addition",
  },
];

export const featuredPhotographyNotes = [
  {
    id: "photo-placeholder-01",
    title: "Photography feed ready",
    alt: "Photography placeholders awaiting Instagram post URLs.",
    imageUrl:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=1200&q=80",
    caption:
      "Add curated Instagram post URLs in content/site-content.ts to replace this placeholder with your photography.",
    postUrl: "https://www.instagram.com/shreeti_nmzz/",
  },
];
