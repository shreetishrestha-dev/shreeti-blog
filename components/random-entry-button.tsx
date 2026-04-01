"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";

export function RandomEntryButton({ slugs }: { slugs: string[] }) {
  const router = useRouter();

  function goRandom() {
    if (!slugs.length) return;
    const choice = slugs[Math.floor(Math.random() * slugs.length)];
    startTransition(() => {
      router.push(`/blog/${choice}/`);
    });
  }

  return (
    <button onClick={goRandom} className="ghost-button inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm">
      Random Post
      <Shuffle size={14} />
    </button>
  );
}
