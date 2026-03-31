"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { CreativeEntry } from "@/lib/types";

export function PoemCard({ entry }: { entry: CreativeEntry }) {
  return (
    <Link href={`/blog/${entry.slug}`} className="block">
      <motion.article
        whileHover={{ scale: 1.015, x: 4 }}
        transition={{ type: "spring", stiffness: 170, damping: 22 }}
        className="poem-card flex min-h-[15rem] items-end"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.38em] text-[var(--muted)]">{entry.sourceLabel}</p>
          <h3 className="mt-4 max-w-[18ch] font-display text-3xl text-[var(--foreground)] md:text-4xl">
            {entry.title}
          </h3>
        </div>
      </motion.article>
    </Link>
  );
}
