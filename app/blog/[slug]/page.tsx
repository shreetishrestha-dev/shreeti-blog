import { notFound } from "next/navigation";

import { ReadingProgress } from "@/components/reading-progress";
import { getAllEntries, getEntryBySlug } from "@/lib/content";
import { formatLongDate } from "@/lib/utils";

export async function generateStaticParams() {
  const entries = await getAllEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntryBySlug(slug);

  if (!entry) notFound();

  return (
    <main className="content-shell pb-20 pt-20 md:pt-28">
      <ReadingProgress />
      <article className="mx-auto max-w-3xl">
        <p className="section-label">{entry.category}</p>
        <h1 className="mt-5 font-display text-6xl leading-[0.92] text-[var(--foreground)] md:text-8xl">{entry.title}</h1>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
          <span>{formatLongDate(entry.publishedAt)}</span>
          <span>{entry.sourceLabel}</span>
          {entry.sourceUrl ? (
            <a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-current underline-offset-4">
              Original source
            </a>
          ) : null}
        </div>
        <div className="paper-panel mt-10 rounded-[2.4rem] p-8 md:p-12">
          <div className="space-y-6 text-lg leading-9 text-[var(--foreground)] md:text-xl">
            {entry.content.map((paragraph, index) => (
              <p key={`${entry.slug}-${index}`} className="whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
