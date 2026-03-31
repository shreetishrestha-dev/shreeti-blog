import { PoemCard } from "@/components/poem-card";
import { SectionHeading } from "@/components/section-heading";
import { getHomeData } from "@/lib/content";

export default async function PoemsPage() {
  const data = await getHomeData();

  return (
    <main className="content-shell section-space pt-20 md:pt-28">
      <SectionHeading
        eyebrow="Poems"
        title="Poems imported from Instagram and curated by hand"
        description="This page is fed by public Instagram post URLs plus manual additions, so the poetry stays easy to manage even when Instagram's profile pages get unreliable."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {data.poems.map((entry) => (
          <PoemCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </main>
  );
}
