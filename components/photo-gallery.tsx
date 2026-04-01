"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useState } from "react";

import type { PhotoItem } from "@/lib/types";

export function PhotoGallery({
  photos,
  variant = "full",
}: {
  photos: PhotoItem[];
  variant?: "full" | "compact";
}) {
  const [active, setActive] = useState<PhotoItem | null>(null);
  const compact = variant === "compact";

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {photos.map((photo, index) => (
          <motion.button
            key={photo.id}
            whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1 }}
            onClick={() => setActive(photo)}
            className={`cutout-card group relative overflow-hidden rounded-[2rem] p-2 pt-10 text-left ${
              compact ? "home-photo-card" : ""
            }`}
          >
            <div className="absolute inset-2 top-10 bg-[linear-gradient(180deg,transparent_18%,rgba(24,18,20,0.78)_100%)]" />
            <Image
              src={photo.imageUrl}
              alt={photo.alt}
              width={900}
              height={1200}
              className={`w-full rounded-[1.5rem] object-cover transition duration-500 group-hover:scale-[1.03] ${
                compact ? "h-[15rem] md:h-[16rem]" : "h-[26rem]"
              }`}
            />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <h3 className={`font-display text-white ${compact ? "text-2xl" : "text-3xl"}`}>{photo.title}</h3>
              {!compact ? <p className="mt-2 text-sm leading-6 text-stone-200">{photo.caption}</p> : null}
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/85 p-4"
          >
            <div className="mx-auto flex h-full max-w-6xl flex-col">
              <div className="mb-4 flex justify-end gap-3">
                {active.postUrl ? (
                  <a
                    href={active.postUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="ghost-button inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm"
                  >
                    Instagram
                    <ExternalLink size={14} />
                  </a>
                ) : null}
                <button className="ghost-button rounded-full p-3" onClick={() => setActive(null)}>
                  <X size={16} />
                </button>
              </div>
              <div className="grid flex-1 gap-6 overflow-hidden rounded-[2rem] md:grid-cols-[1.5fr_0.9fr]">
                <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem]">
                  <Image src={active.imageUrl} alt={active.alt} fill className="object-cover" />
                </div>
                <div className="paper-panel flex flex-col justify-end rounded-[2rem] p-8">
                  <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Lightbox</p>
                  <h3 className="mt-4 font-display text-4xl text-[var(--foreground)]">{active.title}</h3>
                  <p className="mt-4 text-base leading-8 text-[var(--muted)]">{active.caption}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
