import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ContentCard } from "@/components/content-card";
import { InstagramShowcase } from "@/components/instagram-showcase";
import { PhotoGallery } from "@/components/photo-gallery";
import { PoemCard } from "@/components/poem-card";
import { RandomEntryButton } from "@/components/random-entry-button";
import { SectionHeading } from "@/components/section-heading";
import { SiteSearch } from "@/components/site-search";
import { siteConfig } from "@/content/site-content";
import { getHomeData } from "@/lib/content";
import { getDeterministicUniqueSample } from "@/lib/utils";

export default async function Home() {
  const data = await getHomeData();
  const allSlugs = [...data.poems, ...data.articles].map((entry) => entry.slug);
  const homePhotography = getDeterministicUniqueSample(
    data.photography,
    6,
    (photo) => photo.id,
    (photo) => photo.caption || photo.title || photo.id,
  );

  return (
    <main className="pb-16">
      <section className="content-shell section-space pt-14 md:pt-24">
        <div className="collage-stage relative overflow-hidden rounded-[2.8rem] border border-[rgba(34,23,29,0.12)] px-6 py-10 md:px-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.85fr]">
            <div className="hero-copy">
              <p className="section-label mb-5">Siri&apos;s Diary</p>
              <h1 className="max-w-4xl font-display text-6xl leading-[0.88] text-[var(--foreground)] md:text-8xl">
                My Perception
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
                {siteConfig.subtitle} {siteConfig.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/poems" className="ink-button rounded-full px-5 py-3 text-sm">
                  Read poems
                  <ArrowRight size={14} />
                </Link>
                <Link href="/gallery" className="ghost-button rounded-full px-5 py-3 text-sm transition">
                  View gallery
                </Link>
                <RandomEntryButton slugs={allSlugs} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="paper-panel -rotate-2 rounded-[1.8rem] px-5 py-4">
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">A small note to self</p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  I wanted this place to feel gathered, not manufactured, like loose pages, saved photographs, and margin thoughts quietly living together.
                </p>
              </div>
              <div className="paper-panel ink-ring rotate-1 rounded-[2.2rem] p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">What I&apos;m holding onto here</p>
                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-[rgba(238,108,77,0.08)] p-4">
                    <dt className="text-sm text-[var(--muted)]">Poems</dt>
                    <dd className="font-display text-5xl text-[var(--foreground)]">{data.poems.length}</dd>
                  </div>
                  <div className="rounded-[1.5rem] bg-[rgba(61,126,166,0.08)] p-4">
                    <dt className="text-sm text-[var(--muted)]">Articles</dt>
                    <dd className="font-display text-5xl text-[var(--foreground)]">{data.articles.length}</dd>
                  </div>
                  <div className="rounded-[1.5rem] bg-[rgba(241,200,75,0.12)] p-4">
                    <dt className="text-sm text-[var(--muted)]">Embeds</dt>
                    <dd className="font-display text-5xl text-[var(--foreground)]">{data.instagramCards.length}</dd>
                  </div>
                  <div className="rounded-[1.5rem] bg-[rgba(34,23,29,0.06)] p-4">
                    <dt className="text-sm text-[var(--muted)]">Photos</dt>
                    <dd className="font-display text-5xl text-[var(--foreground)]">{data.photography.length}</dd>
                  </div>
                </dl>
                <p className="mt-6 text-sm leading-7 text-[var(--muted)]">
                  Some pieces arrive from Instagram, some from Medium, and some stay because I wanted them to. It all gathers here like a diary with many kinds of pages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell section-space">
        <SiteSearch entries={[...data.poems, ...data.articles]} />
      </section>

      <section className="content-shell section-space">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Poems"
            title="Where my quieter thoughts turn into poems"
            description="These are the lines that stayed with me long enough to become little confessions, fragments, and feelings with their own shape."
          />
          <Link href="/poems" className="ghost-button inline-flex rounded-full px-5 py-3 text-sm transition">
            See all poems
          </Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {data.poems.slice(0, 4).map((entry) => (
            <PoemCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>

      <section className="content-shell section-space">
        <SectionHeading
          eyebrow="Articles"
          title="Longer reflections from days I had more to say"
          description="Some thoughts arrive slowly and need more room. This section holds the longer pieces that read like letters to myself."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {data.articles.map((entry) => (
            <ContentCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>

      <section className="content-shell section-space">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Photography"
            title="A few frames from the places I wanted to remember"
            description="Just a small glimpse from the larger gallery, like opening the diary to a page of saved views."
          />
          <Link href="/gallery" className="ghost-button inline-flex rounded-full px-5 py-3 text-sm transition">
            See all photos
          </Link>
        </div>
        <div className="mt-10">
          <PhotoGallery photos={homePhotography} variant="compact" />
        </div>
      </section>

      <section className="content-shell section-space">
        <SectionHeading
          eyebrow="Instagram"
          title="Little traces from the places I post as I go"
          description="These are the scattered updates, glimpses, and social fragments that still belong to the same story."
        />
        <div className="mt-10">
          <InstagramShowcase cards={data.instagramCards} />
        </div>
      </section>
    </main>
  );
}
