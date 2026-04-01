"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/poems", label: "Poems" },
  { href: "/gallery", label: "Gallery" },
];

export function FloatingNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed right-4 top-4 z-30 flex justify-end">
        <button
          aria-label="Toggle menu"
          className="ghost-button flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium sm:px-4 sm:py-3"
          onClick={() => setOpen((value) => !value)}
        >
          <span>Wander</span>
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            className="fixed inset-x-3 top-18 z-30 mx-auto max-w-3xl sm:inset-x-4 sm:top-20"
          >
            <div className="paper-panel grid gap-3 rounded-[1.6rem] p-3 sm:rounded-[2rem] sm:p-4 md:grid-cols-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="ghost-button rounded-[1.2rem] px-4 py-4 text-center text-sm uppercase tracking-[0.24em] transition sm:rounded-[1.4rem] sm:py-5 sm:tracking-[0.28em]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
