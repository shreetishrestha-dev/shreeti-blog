"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

function Bee({
  className,
  style,
  scale = 1,
}: {
  className: string;
  style: CSSProperties;
  scale?: number;
}) {
  return (
    <span className={className} style={{ ...style, transform: `${style.transform} scale(${scale})` }}>
      <svg viewBox="0 0 64 64" className="h-full w-full overflow-visible" aria-hidden="true">
        <g className="bee-wings">
          <ellipse cx="21" cy="21" rx="10" ry="7" fill="rgba(255,255,255,0.78)" stroke="rgba(72,54,33,0.22)" strokeWidth="2" />
          <ellipse cx="37" cy="19" rx="10" ry="7" fill="rgba(255,255,255,0.78)" stroke="rgba(72,54,33,0.22)" strokeWidth="2" />
        </g>
        <ellipse cx="31" cy="34" rx="16" ry="12" fill="#f4c542" stroke="#3e2c1d" strokeWidth="3" />
        <path d="M20 30H42" stroke="#3e2c1d" strokeWidth="3" strokeLinecap="round" />
        <path d="M18 36H44" stroke="#3e2c1d" strokeWidth="3" strokeLinecap="round" />
        <circle cx="48" cy="32" r="7" fill="#3e2c1d" />
        <circle cx="50" cy="30" r="1.2" fill="#fff4c7" />
        <path d="M50 25C52 21 54 19 57 17" stroke="#3e2c1d" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M47 24C46 20 45 17 42 14" stroke="#3e2c1d" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M18 34L11 31" stroke="#3e2c1d" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Firefly({
  className,
  style,
  scale = 1,
}: {
  className: string;
  style: CSSProperties;
  scale?: number;
}) {
  return (
    <span className={className} style={{ ...style, transform: `${style.transform} scale(${scale})` }}>
      <svg viewBox="0 0 64 64" className="h-full w-full overflow-visible" aria-hidden="true">
        <g className="firefly-wings">
          <ellipse cx="24" cy="21" rx="9" ry="7" fill="rgba(196,226,255,0.55)" stroke="rgba(103,120,150,0.2)" strokeWidth="2" />
          <ellipse cx="39" cy="19" rx="9" ry="7" fill="rgba(196,226,255,0.55)" stroke="rgba(103,120,150,0.2)" strokeWidth="2" />
        </g>
        <ellipse cx="30" cy="34" rx="14" ry="10" fill="#2e2a33" stroke="#17131b" strokeWidth="3" />
        <ellipse cx="20" cy="34" rx="6" ry="5" fill="#25202a" />
        <circle cx="44" cy="32" r="7" fill="#221d25" />
        <circle cx="47" cy="30" r="1.1" fill="#d6ffb1" />
        <ellipse cx="29" cy="35" rx="9" ry="7" fill="#f6f08a" opacity="0.95" className="firefly-glow-core" />
        <ellipse cx="29" cy="35" rx="13" ry="10" fill="#f7f1a3" opacity="0.28" className="firefly-glow-halo" />
        <path d="M45 26C47 22 49 19 52 16" stroke="#221d25" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M42 25C41 21 40 18 37 15" stroke="#221d25" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M17 36L11 39" stroke="#221d25" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function BeeTrail({
  start,
  end,
  active,
}: {
  start: { x: number; y: number };
  end: { x: number; y: number };
  active: boolean;
}) {
  const dx = start.x - end.x;
  const dy = start.y - end.y;
  const distance = Math.hypot(dx, dy);
  const dots = Math.max(0, Math.min(12, Math.floor(distance / 12)));
  const nx = distance > 0 ? -dy / distance : 0;
  const ny = distance > 0 ? dx / distance : 0;
  const amplitude = Math.min(22, Math.max(8, distance * 0.16));

  if (!active || dots === 0) return null;

  return (
    <>
      {Array.from({ length: dots }).map((_, index) => {
        const progress = (index + 1) / (dots + 1);
        const curve =
          Math.sin(progress * Math.PI) * amplitude +
          Math.sin(progress * Math.PI * 2) * amplitude * 0.22;
        const x = end.x + dx * progress + nx * curve;
        const y = end.y + dy * progress + ny * curve;

        return (
          <span
            key={`${x}-${y}-${index}`}
            className="day-cursor pointer-events-none fixed z-45 hidden rounded-full bg-[rgba(61,44,29,0.55)] md:block"
            style={{
              left: x,
              top: y,
              width: `${Math.max(2, 6 - index * 0.32)}px`,
              height: `${Math.max(2, 6 - index * 0.32)}px`,
              opacity: 0.9 - progress * 0.55,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </>
  );
}

function FireflyTrail({
  start,
  end,
  active,
}: {
  start: { x: number; y: number };
  end: { x: number; y: number };
  active: boolean;
}) {
  const dx = start.x - end.x;
  const dy = start.y - end.y;
  const distance = Math.hypot(dx, dy);
  const dots = Math.max(0, Math.min(12, Math.floor(distance / 12)));
  const nx = distance > 0 ? -dy / distance : 0;
  const ny = distance > 0 ? dx / distance : 0;
  const amplitude = Math.min(22, Math.max(8, distance * 0.16));

  if (!active || dots === 0) return null;

  return (
    <>
      {Array.from({ length: dots }).map((_, index) => {
        const progress = (index + 1) / (dots + 1);
        const curve =
          Math.sin(progress * Math.PI) * amplitude +
          Math.sin(progress * Math.PI * 2) * amplitude * 0.22;
        const x = end.x + dx * progress + nx * curve;
        const y = end.y + dy * progress + ny * curve;

        return (
          <span
            key={`${x}-${y}-${index}`}
            className="pointer-events-none fixed z-45 hidden rounded-full bg-[rgba(241,235,143,0.78)] md:block"
            style={{
              left: x,
              top: y,
              width: `${Math.max(2, 6 - index * 0.32)}px`,
              height: `${Math.max(2, 6 - index * 0.32)}px`,
              boxShadow: "0 0 10px rgba(244, 236, 132, 0.5)",
              opacity: 0.92 - progress * 0.58,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </>
  );
}

export function CustomCursor() {
  const [cursorState, setCursorState] = useState({
    position: { x: 0, y: 0 },
    heading: 0,
    active: false,
  });
  const [trailState, setTrailState] = useState({
    position: { x: 0, y: 0 },
    heading: 0,
  });
  const targetRef = useRef({ x: 0, y: 0 });
  const previousTargetRef = useRef({ x: 0, y: 0 });
  const trailPositionRef = useRef({ x: 0, y: 0 });
  const trailHeadingRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  function getAngle(from: { x: number; y: number }, to: { x: number; y: number }) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) return null;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const next = { x: event.clientX, y: event.clientY };
      const nextHeading = getAngle(previousTargetRef.current, next);

      targetRef.current = next;
      previousTargetRef.current = next;
      setCursorState((current) => ({
        ...current,
        position: next,
        heading: nextHeading ?? current.heading,
        active: true,
      }));
    };

    const onLeave = () =>
      setCursorState((current) => ({
        ...current,
        active: false,
      }));

    const tick = () => {
      const currentTrail = trailPositionRef.current;
      const next = {
        x: currentTrail.x + (targetRef.current.x - currentTrail.x) * 0.13,
        y: currentTrail.y + (targetRef.current.y - currentTrail.y) * 0.13,
      };
      const nextHeading = getAngle(currentTrail, next);

      trailPositionRef.current = next;
      trailHeadingRef.current = nextHeading ?? trailHeadingRef.current;

      setTrailState({
        position: next,
        heading: trailHeadingRef.current,
      });
      animationRef.current = window.requestAnimationFrame(tick);
    };

    animationRef.current = window.requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <>
      <BeeTrail start={cursorState.position} end={trailState.position} active={cursorState.active} />
      <FireflyTrail start={cursorState.position} end={trailState.position} active={cursorState.active} />
      <Bee
        className="day-cursor pointer-events-none fixed z-50 hidden h-12 w-12 transition-transform duration-75 md:block"
        style={{
          transform: `translate3d(${cursorState.position.x - 19}px, ${cursorState.position.y - 24}px, 0) rotate(${cursorState.heading}deg)`,
          opacity: cursorState.active ? 1 : 0,
        }}
      />
      <Bee
        className="day-cursor pointer-events-none fixed z-40 hidden h-10 w-10 opacity-85 transition-transform duration-150 md:block"
        scale={0.88}
        style={{
          transform: `translate3d(${trailState.position.x - 16}px, ${trailState.position.y - 19}px, 0) rotate(${trailState.heading}deg)`,
          opacity: cursorState.active ? 0.85 : 0,
        }}
      />
      <Firefly
        className="night-cursor pointer-events-none fixed z-50 hidden h-12 w-12 transition-transform duration-75 md:block"
        style={{
          transform: `translate3d(${cursorState.position.x - 19}px, ${cursorState.position.y - 24}px, 0) rotate(${cursorState.heading}deg)`,
          opacity: cursorState.active ? 1 : 0,
        }}
      />
      <Firefly
        className="night-cursor pointer-events-none fixed z-40 hidden h-10 w-10 opacity-85 transition-transform duration-150 md:block"
        scale={0.88}
        style={{
          transform: `translate3d(${trailState.position.x - 16}px, ${trailState.position.y - 19}px, 0) rotate(${trailState.heading}deg)`,
          opacity: cursorState.active ? 0.85 : 0,
        }}
      />
    </>
  );
}
