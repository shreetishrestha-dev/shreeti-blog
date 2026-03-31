import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="section-label">{eyebrow}</p>
      <h2 className="mt-5 font-display text-4xl leading-none md:text-6xl">{title}</h2>
      <div className={cn("scribble-divider", align === "center" && "mx-auto")} />
      <p className="mt-5 text-base leading-8 text-[var(--muted)] md:text-lg">{description}</p>
    </div>
  );
}
