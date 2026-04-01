"use client";

import { useRouter } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";

import { withBasePath } from "@/lib/site";

type IntentLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

export function IntentLink({ href, onMouseEnter, onFocus, onTouchStart, ...props }: IntentLinkProps) {
  const router = useRouter();
  const normalizedHref = href === "/" || href.endsWith("/") ? href : `${href}/`;
  const resolvedHref = withBasePath(normalizedHref);

  return (
    <a
      {...props}
      href={resolvedHref}
      onMouseEnter={(event) => {
        router.prefetch(resolvedHref);
        onMouseEnter?.(event);
      }}
      onFocus={(event) => {
        router.prefetch(resolvedHref);
        onFocus?.(event);
      }}
      onTouchStart={(event) => {
        router.prefetch(resolvedHref);
        onTouchStart?.(event);
      }}
    />
  );
}
