"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

type IntentLinkProps = ComponentProps<typeof Link>;

export function IntentLink({ href, onMouseEnter, onFocus, onTouchStart, ...props }: IntentLinkProps) {
  const router = useRouter();

  return (
    <Link
      {...props}
      href={href}
      prefetch
      onMouseEnter={(event) => {
        if (typeof href === "string") router.prefetch(href);
        onMouseEnter?.(event);
      }}
      onFocus={(event) => {
        if (typeof href === "string") router.prefetch(href);
        onFocus?.(event);
      }}
      onTouchStart={(event) => {
        if (typeof href === "string") router.prefetch(href);
        onTouchStart?.(event);
      }}
    />
  );
}
