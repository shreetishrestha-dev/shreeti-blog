import Image from "next/image";

import { withBasePath } from "@/lib/site";
import type { InstagramCard } from "@/lib/types";

const sketchPlaceholders = [
  "/sketch-placeholder-a.svg",
  "/sketch-placeholder-b.svg",
  "/sketch-placeholder-c.svg",
];

function getSketchPlaceholder(seed: string) {
  const hash = seed.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return sketchPlaceholders[hash % sketchPlaceholders.length];
}

export function InstagramShowcase({ cards }: { cards: InstagramCard[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {cards.map((card) => {
        const sketchPlaceholder = getSketchPlaceholder(card.id);

        return (
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
                  src={withBasePath(card.imageUrl)}
                  alt={card.title}
                  width={240}
                  height={240}
                  className="h-[120px] w-full object-cover transition duration-500 group-hover:scale-110"
                />
              ) : (
                <Image
                  src={withBasePath(sketchPlaceholder)}
                  alt="Sketch placeholder"
                  width={240}
                  height={240}
                  className="h-[120px] w-full object-cover"
                />
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.5)]">
                  {card.profileImageUrl ? (
                    <Image
                      src={withBasePath(card.profileImageUrl)}
                      alt={card.username ? `${card.username} profile photo` : card.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src={withBasePath(sketchPlaceholder)}
                      alt="Sketch profile placeholder"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">{card.kind}</p>
                  {card.username ? (
                    <p className="mt-1 text-sm font-medium text-[var(--foreground)]">@{card.username}</p>
                  ) : null}
                </div>
              </div>
              <h3 className="mt-3 font-display text-3xl text-[var(--foreground)]">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{card.caption}</p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
