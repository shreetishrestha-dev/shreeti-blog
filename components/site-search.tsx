"use client";

import { Search } from "lucide-react";
import { useDeferredValue, useState } from "react";

import { IntentLink } from "@/components/intent-link";
import type { CreativeEntry } from "@/lib/types";
import { formatLongDate } from "@/lib/utils";

export function SiteSearch({ entries }: { entries: CreativeEntry[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const results = normalizedQuery
    ? entries
        .filter((entry) => {
          const searchableText = [
            entry.title,
            entry.excerpt,
            entry.content.join(" "),
            entry.tags.join(" "),
          ]
            .join(" ")
            .toLowerCase();

          return searchableText.includes(normalizedQuery);
        })
        .slice(0, 8)
    : [];

  return (
    <div className="paper-panel rounded-[2.4rem] p-6 md:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(241,200,75,0.14)] text-[var(--foreground)]">
          <Search size={18} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Search the diary</p>
          <p className="mt-1 text-sm leading-7 text-[var(--muted)]">
            Look through poems and articles by mood, phrase, or title.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="site-search" className="sr-only">
          Search poems and articles
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search poems and articles..."
          className="w-full rounded-[1.4rem] border border-[var(--button-border)] bg-[var(--button-surface)] px-5 py-4 text-base text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent-secondary)]"
        />
      </div>

      {normalizedQuery ? (
        <div className="mt-6 grid gap-3">
          {results.length ? (
            results.map((entry) => (
              <IntentLink
                key={entry.slug}
                href={`/blog/${entry.slug}`}
                className="cutout-card rounded-[1.6rem] p-4 transition hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
                  <span>{entry.category}</span>
                  <span>{formatLongDate(entry.publishedAt)}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl text-[var(--foreground)]">{entry.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{entry.excerpt}</p>
              </IntentLink>
            ))
          ) : (
            <div className="rounded-[1.6rem] border border-dashed border-[var(--border)] px-5 py-6 text-sm leading-7 text-[var(--muted)]">
              Nothing showed up for that search yet. Try a different phrase, title, or feeling.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
