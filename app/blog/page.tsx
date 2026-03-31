import { ContentCard } from "@/components/content-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllEntries } from "@/lib/content";

export default async function BlogPage() {
  const entries = await getAllEntries();

  return (
    <main className="content-shell section-space pt-20 md:pt-28">
      <SectionHeading
        eyebrow="Archive"
        title="Everything the site is holding right now"
        description="A single room for poems and articles, with the visual atmosphere intact but the scope kept intentionally tight."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {entries.map((entry) => (
          <ContentCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </main>
  );
}
