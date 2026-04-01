"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function PageUtilities() {
  const pathname = usePathname();
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 280);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/") {
    return null;
  }

  return (
    <>
      <div className="pointer-events-none fixed left-4 top-20 z-30 flex justify-start">
        <div className="pointer-events-auto">
          <Link href="/" className="ghost-button page-home-badge flex items-center gap-3 rounded-full px-3 py-3" aria-label="Go to home page">
            <span className="page-home-logo flex h-11 w-11 items-center justify-center rounded-full text-lg font-semibold">
              S
            </span>
            <span className="pr-2">
              <span className="block text-[0.62rem] uppercase tracking-[0.28em] text-[var(--muted)]">Home</span>
              <span className="block text-sm font-medium text-[var(--foreground)]">Siri&apos;s Diary</span>
            </span>
          </Link>
        </div>
      </div>
      <div className="pointer-events-none fixed bottom-5 right-4 z-30 flex justify-end">
        <div className="pointer-events-auto">
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`ghost-button flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-all ${
              showTopButton ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
            }`}
          >
            <ArrowUp size={16} />
            <span>Top</span>
          </button>
        </div>
      </div>
    </>
  );
}
