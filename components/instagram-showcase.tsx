import Image from "next/image";

import type { InstagramCard } from "@/lib/types";

export function InstagramShowcase({ cards }: { cards: InstagramCard[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {cards.map((card) => (
        <a
          key={card.id}
          href={card.url}
          target="_blank"
          rel="noreferrer"
          className="cutout-card group grid gap-5 rounded-[2.1rem] p-5 pt-12 md:grid-cols-[120px_1fr]"
        >
          <div className="relative overflow-hidden rounded-[1.5rem] bg-stone-200/80">
            {card.imageUrl ? (
              <Image
                src={card.imageUrl}
                alt={card.title}
                width={240}
                height={240}
                className="h-[120px] w-full object-cover transition duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="h-[120px] w-full bg-[radial-gradient(circle_at_top,#ffcf96_0%,#ff8fab_45%,#6da9ff_100%)]" />
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">{card.kind}</p>
            <h3 className="mt-3 font-display text-3xl text-[var(--foreground)]">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{card.caption}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
