"use client";

import { startTransition, useEffect, useState } from "react";

type ThemeName = "dawn" | "nocturne";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof window === "undefined") return "dawn";
    return window.localStorage.getItem("creative-theme") === "nocturne" ? "nocturne" : "dawn";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    startTransition(() => {
      const nextTheme = theme === "dawn" ? "nocturne" : "dawn";
      setTheme(nextTheme);
      document.documentElement.dataset.theme = nextTheme;
      window.localStorage.setItem("creative-theme", nextTheme);
    });
  }

  return (
    <button className="ghost-button rounded-full px-4 py-3 text-sm font-medium" onClick={toggleTheme}>
      Palette: {theme === "dawn" ? "Dawn" : "Nocturne"}
    </button>
  );
}
