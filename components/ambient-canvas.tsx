"use client";

import Image from "next/image";

import { withBasePath } from "@/lib/site";

const sunflowers = [
  {
    src: "/sunflower-crayon-a.svg",
    alt: "Hand-drawn sunflower swaying in the wind",
    className: "sunflower-sticker left-[8%] top-[8%] w-44 md:w-64",
    style: {
      animationDelay: "0s, 0.4s",
      animationDuration: "5.1s, 8.4s",
    },
  },
  {
    src: "/sunflower-crayon-b.svg",
    alt: "Crayon sunflower drifting near the upper center",
    className: "sunflower-sticker left-[40%] top-[4%] w-40 md:w-56",
    style: {
      animationDelay: "1.2s, 1.8s",
      animationDuration: "5.9s, 9.6s",
    },
  },
  {
    src: "/sunflower-crayon-c.svg",
    alt: "Large playful sunflower near the center",
    className: "sunflower-sticker left-[22%] top-[18%] w-52 md:w-76",
    style: {
      animationDelay: "0.6s, 2.1s",
      animationDuration: "4.8s, 8.9s",
    },
  },
  {
    src: "/sunflower-crayon-b.svg",
    alt: "Small sunflower tucked near the center right",
    className: "sunflower-sticker left-[68%] top-[22%] w-34 md:w-48",
    style: {
      animationDelay: "2.2s, 1s",
      animationDuration: "6.2s, 10.1s",
    },
  },
  {
    src: "/sunflower-crayon-a.svg",
    alt: "Large sunflower drifting near the lower center",
    className: "sunflower-sticker left-[50%] top-[50%] w-48 md:w-68",
    style: {
      animationDelay: "1.1s, 2.8s",
      animationDuration: "5.4s, 9.2s",
    },
  },
  {
    src: "/sunflower-crayon-c.svg",
    alt: "Offset sunflower leaning in from the left",
    className: "sunflower-sticker left-[4%] top-[44%] w-36 md:w-52",
    style: {
      animationDelay: "1.7s, 0.9s",
      animationDuration: "6.5s, 9.7s",
    },
  },
  {
    src: "/sunflower-crayon-a.svg",
    alt: "Tall sunflower leaning across the middle",
    className: "sunflower-sticker left-[76%] top-[40%] w-40 md:w-54",
    style: {
      animationDelay: "0.9s, 2.6s",
      animationDuration: "5s, 8.1s",
    },
  },
  {
    src: "/sunflower-crayon-b.svg",
    alt: "Broad sunflower opening across the lower left",
    className: "sunflower-sticker left-[20%] top-[58%] w-42 md:w-58",
    style: {
      animationDelay: "2.6s, 1.4s",
      animationDuration: "5.7s, 9.9s",
    },
  },
  {
    src: "/sunflower-crayon-c.svg",
    alt: "Wide sunflower drifting across the upper right",
    className: "sunflower-sticker left-[62%] top-[6%] w-38 md:w-52",
    style: {
      animationDelay: "1.5s, 2.3s",
      animationDuration: "6.1s, 10.4s",
    },
  },
];

const stars = [
  { className: "star-spark left-[12%] top-[14%] h-2 w-2", style: { animationDelay: "0s" } },
  { className: "star-spark left-[24%] top-[8%] h-3 w-3", style: { animationDelay: "1.2s" } },
  { className: "star-spark left-[38%] top-[18%] h-2.5 w-2.5", style: { animationDelay: "0.6s" } },
  { className: "star-spark left-[51%] top-[10%] h-4 w-4", style: { animationDelay: "1.8s" } },
  { className: "star-spark left-[66%] top-[16%] h-2 w-2", style: { animationDelay: "0.9s" } },
  { className: "star-spark left-[78%] top-[8%] h-3.5 w-3.5", style: { animationDelay: "2.1s" } },
  { className: "star-spark left-[18%] top-[34%] h-2 w-2", style: { animationDelay: "1.5s" } },
  { className: "star-spark left-[33%] top-[42%] h-3 w-3", style: { animationDelay: "0.4s" } },
  { className: "star-spark left-[47%] top-[28%] h-5 w-5", style: { animationDelay: "2.5s" } },
  { className: "star-spark left-[59%] top-[38%] h-2.5 w-2.5", style: { animationDelay: "1.1s" } },
  { className: "star-spark left-[72%] top-[32%] h-3 w-3", style: { animationDelay: "1.9s" } },
  { className: "star-spark left-[84%] top-[40%] h-2 w-2", style: { animationDelay: "0.3s" } },
  { className: "star-spark left-[9%] top-[56%] h-3 w-3", style: { animationDelay: "1.7s" } },
  { className: "star-spark left-[22%] top-[68%] h-2 w-2", style: { animationDelay: "0.8s" } },
  { className: "star-spark left-[41%] top-[62%] h-3.5 w-3.5", style: { animationDelay: "2.2s" } },
  { className: "star-spark left-[56%] top-[74%] h-2.5 w-2.5", style: { animationDelay: "0.5s" } },
  { className: "star-spark left-[69%] top-[58%] h-3 w-3", style: { animationDelay: "1.4s" } },
  { className: "star-spark left-[82%] top-[70%] h-4 w-4", style: { animationDelay: "2.4s" } },
];

export function AmbientCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="day-field absolute inset-0">
        <div className="day-ambient absolute inset-0 bg-[radial-gradient(circle_at_36%_22%,rgba(255,210,112,0.18),transparent_20%),radial-gradient(circle_at_60%_28%,rgba(242,134,97,0.12),transparent_18%),radial-gradient(circle_at_47%_62%,rgba(118,170,201,0.14),transparent_22%),radial-gradient(circle_at_28%_52%,rgba(255,210,112,0.1),transparent_16%)]" />
        {sunflowers.map((flower) => (
          <div key={`${flower.src}-${flower.className}`} className={flower.className} style={flower.style}>
            <Image
              src={withBasePath(flower.src)}
              alt={flower.alt}
              width={220}
              height={260}
              className="h-auto w-full"
              priority={false}
            />
          </div>
        ))}
      </div>
      <div className="night-field absolute inset-0">
        <div className="night-ambient absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(142,177,255,0.16),transparent_18%),radial-gradient(circle_at_40%_42%,rgba(255,246,173,0.08),transparent_14%),radial-gradient(circle_at_70%_58%,rgba(103,140,255,0.12),transparent_22%),linear-gradient(180deg,rgba(10,15,31,0.15),rgba(10,15,31,0.02))]" />
        {stars.map((star) => (
          <span key={star.className} className={star.className} style={star.style} />
        ))}
      </div>
      <div className="ambient-reading-veil" />
    </div>
  );
}
