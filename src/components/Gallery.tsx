"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import LazyVideo from "./LazyVideo";
import { Lines } from "./ui";
import { img, vid } from "@/lib/site";

type Item = { id: number; alt: string; ratio: string; video?: string };

const ITEMS: Item[] = [
  { id: 52042, alt: "Soft-glam portrait", ratio: "aspect-[4/5]" },
  { id: 15806, alt: "Manicure in progress", ratio: "aspect-[4/3]" },
  { id: 367, alt: "Mascara close-up", ratio: "aspect-[3/4]", video: "mascara" },
  { id: 50793, alt: "Traditional look with statement jewellery", ratio: "aspect-[9/16]" },
  { id: 52057, alt: "Blush application", ratio: "aspect-square" },
  { id: 36905, alt: "Nail art session", ratio: "aspect-[4/5]" },
  { id: 40547, alt: "Lash curl detail", ratio: "aspect-[3/2]" },
  { id: 51232, alt: "Bridal gown detail", ratio: "aspect-[3/4]" },
  { id: 50782, alt: "Jewellery and glow — campaign loop", ratio: "aspect-[9/16]", video: "hero-mobile" },
  { id: 40551, alt: "Lash tint", ratio: "aspect-[4/3]" },
  { id: 23596, alt: "Polish finish", ratio: "aspect-square" },
  { id: 24701, alt: "Makeup session in the salon", ratio: "aspect-[4/5]" },
  { id: 51997, alt: "Natural curls", ratio: "aspect-[3/2]" },
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    const b = box.current;
    if (!b) return setOpen(null);
    gsap.to(b, { autoAlpha: 0, duration: 0.4, ease: "power2.in", onComplete: () => setOpen(null) });
  }, []);

  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + ITEMS.length) % ITEMS.length)), []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    if (open === null) {
      lenis?.start();
      document.documentElement.style.overflow = "";
      return;
    }
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const b = box.current!;
    gsap.fromTo(b, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 });
    gsap.fromTo(
      b.querySelector("[data-lb-media]"),
      { clipPath: "inset(12% 12% 12% 12%)", scale: 0.94 },
      { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.9, ease: "expo.out" },
    );
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, close, step]);

  const cur = open !== null ? ITEMS[open] : null;

  return (
    <section id="gallery" data-theme="light" className="bg-pearl px-4 py-24 text-ink md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Lines className="text-[3.2rem] md:text-[7.5rem]" lines={["The Cuts ’n’ Shades", <em key="e" className="text-fuchsia">Edit.</em>]} />
          <p data-fade className="max-w-xs text-char/70">Hair, colour, bridal, skin, lashes and nails. Tap any frame to view.</p>
        </div>

        {/* Mobile: swipe strip · Desktop: masonry */}
        <div className="no-scrollbar -mx-4 mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:mx-0 md:block md:columns-3 md:gap-5 md:overflow-visible md:px-0 lg:columns-4">
          {ITEMS.map((it, i) => (
            <button
              key={it.id}
              onClick={() => setOpen(i)}
              data-clip={i % 3 === 0 ? "diag" : i % 3 === 1 ? "up" : "left"}
              data-cursor={it.video ? "play" : "view"}
              aria-label={`Open ${it.alt}`}
              className={`group relative block w-[70vw] shrink-0 snap-center overflow-hidden md:mb-5 md:w-full md:break-inside-avoid ${it.ratio}`}
            >
              {it.video ? (
                <LazyVideo src={vid(it.video)} poster={img(it.id)} className="transition-transform duration-[1.4s] ease-[var(--ease-lux)] group-hover:scale-110" />
              ) : (
                <Image
                  src={img(it.id)}
                  alt={it.alt}
                  fill
                  sizes="(max-width:768px) 70vw, (max-width:1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-lux)] group-hover:scale-110"
                />
              )}
              <span className="absolute inset-0 bg-wine/0 transition-colors duration-500 group-hover:bg-wine/20" />
              <span className="absolute bottom-3 left-3 translate-y-3 text-left text-xs text-pearl opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {it.alt}
              </span>
              {it.video && <Play className="absolute right-3 top-3 size-4 fill-pearl text-pearl" />}
            </button>
          ))}
        </div>
      </div>

      {cur && (
        <div
          ref={box}
          role="dialog"
          aria-modal="true"
          aria-label={cur.alt}
          data-lenis-prevent
          className="fixed inset-0 z-[160] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm md:p-12"
          onClick={close}
        >
          <div data-lb-media className="relative h-full max-h-[86svh] w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            {cur.video ? (
              <video key={cur.id} src={vid(cur.video)} poster={img(cur.id)} autoPlay muted loop playsInline className="h-full w-full object-contain" />
            ) : (
              <Image key={cur.id} src={img(cur.id)} alt={cur.alt} fill sizes="100vw" className="object-contain" />
            )}
          </div>
          <p className="eyebrow absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-silver">
            {String(open! + 1).padStart(2, "0")} / {ITEMS.length} · {cur.alt}
          </p>
          <button onClick={close} aria-label="Close" className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full border border-white/20 text-pearl hover:border-fuchsia hover:text-fuchsia md:right-8 md:top-8">
            <X className="size-5" />
          </button>
          {[-1, 1].map((d) => (
            <button
              key={d}
              onClick={(e) => {
                e.stopPropagation();
                step(d);
              }}
              aria-label={d < 0 ? "Previous" : "Next"}
              className={`absolute top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-pearl hover:border-fuchsia hover:text-fuchsia ${d < 0 ? "left-3 md:left-8" : "right-3 md:right-8"}`}
            >
              {d < 0 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
