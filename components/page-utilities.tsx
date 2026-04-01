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
      <div className="pointer-events-none fixed left-3 top-18 z-30 flex justify-start sm:left-4 sm:top-20">
        <div className="pointer-events-auto">
          <Link href="/" className="ghost-button page-home-badge flex items-center gap-2 rounded-full px-2.5 py-2.5 sm:gap-3 sm:px-3 sm:py-3" aria-label="Go to home page">
            <span className="page-home-logo flex h-10 w-10 items-center justify-center rounded-full text-base font-semibold sm:h-11 sm:w-11 sm:text-lg">
              S
            </span>
            <span className="hidden pr-2 sm:block">
              <span className="block text-[0.62rem] uppercase tracking-[0.28em] text-[var(--muted)]">Home</span>
              <span className="block text-sm font-medium text-[var(--foreground)]">Siri&apos;s Diary</span>
            </span>
          </Link>
        </div>
      </div>
      <div className="pointer-events-none fixed bottom-4 right-3 z-30 flex justify-end sm:bottom-5 sm:right-4">
        <div className="pointer-events-auto">
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`ghost-button flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium transition-all sm:px-4 sm:py-3 ${
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
