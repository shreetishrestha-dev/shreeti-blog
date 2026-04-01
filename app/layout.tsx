import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import "./globals.css";

import { AmbientCanvas } from "@/components/ambient-canvas";
import { CustomCursor } from "@/components/custom-cursor";
import { FooterIsland } from "@/components/footer-island";
import { FloatingNav } from "@/components/floating-nav";
import { PageUtilities } from "@/components/page-utilities";
import { ThemeSwitcher } from "@/components/theme-switcher";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Serendipitous Soul",
  description: "A playful creative space for poems, photography, articles, and styled Instagram moments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`} suppressHydrationWarning>
      <body>
        <AmbientCanvas />
        <CustomCursor />
        <FloatingNav />
        <PageUtilities />
        <div className="pointer-events-none fixed inset-x-4 top-4 z-20 flex justify-start">
          <div className="pointer-events-auto">
            <ThemeSwitcher />
          </div>
        </div>
        {children}
        <FooterIsland />
      </body>
    </html>
  );
}
