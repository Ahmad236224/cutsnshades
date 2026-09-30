"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/** Desktop-only fuchsia ring that reacts to [data-cursor] targets, images, videos and booking links. */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const el = ring.current!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      let l = tagged?.dataset.cursor ?? "";
      if (!l && t.closest("video")) l = "play";
      else if (!l && t.closest("img")) l = "view";
      const interactive = !!t.closest("a, button");
      setLabel(l);
      gsap.to(el, {
        scale: l ? 2.6 : interactive ? 1.6 : 1,
        backgroundColor: l ? "rgba(209,34,115,0.92)" : "rgba(209,34,115,0)",
        duration: 0.35,
        ease: "power3.out",
      });
    };
    const out = () => gsap.to(el, { autoAlpha: 0, duration: 0.2 });
    const inn = () => gsap.to(el, { autoAlpha: 1, duration: 0.2 });

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", out);
    document.addEventListener("mouseenter", inn);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", out);
      document.removeEventListener("mouseenter", inn);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      hidden={!enabled}
      className="pointer-events-none fixed left-0 top-0 z-[200] -ml-5 -mt-5 flex size-10 items-center justify-center rounded-full border border-fuchsia mix-blend-normal"
    >
      <span className="text-[5px] font-bold uppercase tracking-[0.2em] text-pearl">{label}</span>
    </div>
  );
}
