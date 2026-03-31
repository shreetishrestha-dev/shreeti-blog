"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height <= 0) {
        setProgress(0);
        return;
      }

      setProgress((window.scrollY / height) * 100);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-40 h-1 bg-transparent">
      <div
        className="h-full bg-[linear-gradient(90deg,#ffe2a8_0%,#ff8fab_45%,#8ec5ff_100%)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
