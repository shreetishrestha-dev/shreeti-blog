import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { ContentCard } from "@/components/content-card";
import { InstagramShowcase } from "@/components/instagram-showcase";
import { PhotoGallery } from "@/components/photo-gallery";
import { PoemCard } from "@/components/poem-card";
import { RandomEntryButton } from "@/components/random-entry-button";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/content/site-content";
import { getHomeData } from "@/lib/content";

export default async function Home() {
  const data = await getHomeData();
  const allSlugs = [...data.poems, ...data.articles].map((entry) => entry.slug);

  return (
    <main className="pb-16">
      <section className="content-shell section-space pt-14 md:pt-24">
        <div className="collage-stage relative overflow-hidden rounded-[2.8rem] border border-[rgba(34,23,29,0.12)] px-6 py-10 md:px-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.85fr]">
            <div className="hero-copy">
              <p className="section-label mb-5">Creative playground</p>
              <h1 className="max-w-4xl font-display text-6xl leading-[0.88] text-[var(--foreground)] md:text-8xl">
                Notes,
                <br />
                images,
                <br />
                and detours.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
                {siteConfig.subtitle} {siteConfig.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/blog" className="ink-button rounded-full px-5 py-3 text-sm">
                  Enter archive
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
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Moodboard note</p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Built to feel touched by hand: scraps, headlines, margin notes, and images that behave like found objects instead of polished widgets.
                </p>
              </div>
              <div className="paper-panel ink-ring rotate-1 rounded-[2.2rem] p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Currently held here</p>
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
                  Instagram profile cards and Medium stories load live when public metadata is available. Curated post URLs and manual additions keep the site stable when scraping gets moody.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell section-space">
        <SectionHeading
          eyebrow="Featured"
          title="Cards that invite a second look"
          description="A small constellation of the most expressive entries, designed to feel tactile and slightly theatrical."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {data.featured.map((entry) => (
            <ContentCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>

      <section className="content-shell section-space">
        <SectionHeading
          eyebrow="Poems"
          title="A softer room for lines and pauses"
          description="Poetry is treated less like a feed and more like a quiet encounter. Instagram-sourced poems can sit beside manual additions without feeling mismatched."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {data.poems.map((entry) => (
            <PoemCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>

      <section className="content-shell section-space">
        <SectionHeading
          eyebrow="Articles"
          title="Editorial pieces with space to breathe"
          description="Longer writing gets a calmer rhythm here, sitting beside the poems without feeling like a different site."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {data.articles.map((entry) => (
            <ContentCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>

      <section className="content-shell section-space">
        <SectionHeading
          eyebrow="Photography"
          title="Frames for light, texture, and small accidents"
          description="A gallery section with a cinematic lightbox, tuned for hover on desktop and tap on mobile."
        />
        <div className="mt-10">
          <PhotoGallery photos={data.photography} />
        </div>
      </section>

      <section className="content-shell section-space">
        <SectionHeading
          eyebrow="Instagram"
          title="Styled like part of the world, not pasted into it"
          description="Profile metadata is shaped into editorial cards instead of default embeds, so the social layer still feels designed."
        />
        <div className="mt-10">
          <InstagramShowcase cards={data.instagramCards} />
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a
            href={`https://www.instagram.com/${siteConfig.instagram.poemsHandle}/`}
            target="_blank"
            rel="noreferrer"
            className="ghost-button inline-flex items-center gap-2 rounded-full px-4 py-3"
          >
            Visit poems profile
            <ExternalLink size={14} />
          </a>
          <a
            href={`https://www.instagram.com/${siteConfig.instagram.photographyHandle}/`}
            target="_blank"
            rel="noreferrer"
            className="ghost-button inline-flex items-center gap-2 rounded-full px-4 py-3"
          >
            Visit photography profile
            <ExternalLink size={14} />
          </a>
        </div>
      </section>
    </main>
  );
}
