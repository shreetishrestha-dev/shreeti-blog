import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";

export default function CreativeSpacePage() {
  return (
    <main className="content-shell section-space pt-20 md:pt-28">
      <SectionHeading
        eyebrow="Creative Space"
        title="A brief note on the energy of this place"
        description="This page works like an artist statement, but with less stiffness and more warmth."
      />
      <div className="paper-panel mt-10 grid gap-8 rounded-[2.4rem] p-8 md:grid-cols-2 md:p-12">
        <div>
          <p className="font-display text-4xl text-[var(--foreground)]">Personal, playful, and slightly unpredictable.</p>
          <p className="mt-5 text-base leading-8 text-[var(--muted)]">
            The site is built as a creative lab rather than a polished corporate archive. Typography gets to emote. Motion gets to whisper. Content can arrive from Instagram, Medium, or a manually added note without losing the overall mood.
          </p>
        </div>
        <div className="space-y-5 text-sm leading-8 text-[var(--muted)]">
          <p>Sections are modular so poems can remain intimate, articles can stay readable, and photography can expand into a dedicated visual rhythm.</p>
          <p>The backend layer is intentionally light: public RSS where it exists, resilient metadata scraping where possible, and clean manual fallbacks where platforms are restrictive.</p>
          <Link href="/blog" className="ink-button rounded-full px-5 py-3 transition">
            Walk into the archive
          </Link>
        </div>
      </div>
    </main>
  );
}
