"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { IntentLink } from "@/components/intent-link";
import type { CreativeEntry } from "@/lib/types";
import { formatLongDate } from "@/lib/utils";

export function ContentCard({ entry }: { entry: CreativeEntry }) {
  return (
    <motion.article
      whileHover={{ y: -8, rotate: entry.category === "poem" ? -1 : 1, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 170, damping: 20 }}
      className="cutout-card group flex h-full flex-col rounded-[2.2rem] p-6 pt-12"
    >
      <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
        <span>{entry.category}</span>
        <span>{formatLongDate(entry.publishedAt)}</span>
      </div>
      <h3 className="font-display text-3xl leading-tight text-[var(--foreground)]">{entry.title}</h3>
      <p
        className={`mt-4 flex-1 text-sm leading-7 text-[var(--muted)] ${
          entry.category === "poem" ? "whitespace-pre-wrap" : ""
        }`}
      >
        {entry.excerpt}
      </p>
      <div className="mt-6 flex items-center justify-between text-sm text-[var(--muted)]">
        <span>{entry.sourceLabel}</span>
        <IntentLink
          href={`/blog/${entry.slug}`}
          className="ghost-button inline-flex items-center gap-2 rounded-full px-4 py-2 transition"
        >
          Read
          <ArrowUpRight size={16} />
        </IntentLink>
      </div>
    </motion.article>
  );
}
