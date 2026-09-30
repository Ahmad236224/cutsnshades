"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import LazyVideo from "./LazyVideo";
import { EXTERNAL, LINKS, SITE, img, vid } from "@/lib/site";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ov = intro.current!;
    if (reduced) {
      ov.remove();
      return;
    }
    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      const edge = { r: 130, l: 100 };
      const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
      tl.fromTo(ov.querySelector("[data-iline]"), { scaleX: 0 }, { scaleX: 1, duration: 0.45 })
        .from(ov.querySelectorAll("[data-iword] > span"), { yPercent: 110, duration: 0.45, stagger: 0.04, ease: "expo.out" }, 0.18)
        .to(
          edge,
          {
            r: 0,
            l: -30,
            duration: 0.65,
            onUpdate: () => {
              ov.style.clipPath = `polygon(0% 0%, 100% 0%, 100% ${edge.r}%, 0% ${edge.l}%)`;
            },
          },
          0.62,
        )
        .fromTo(q("[data-hero-media]"), { scale: 1.25 }, { scale: 1, duration: 1.3, ease: "expo.out" }, 0.62)
        .from(q("[data-hl] > span"), { yPercent: 115, duration: 0.9, stagger: 0.08, ease: "expo.out" }, 0.85)
        .from(q("[data-hfade]"), { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.06, ease: "power3.out" }, 1.0)
        .set(ov, { display: "none" });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="home" data-theme="dark" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink">
      {/* Intro overlay */}
      <div ref={intro} className="fixed inset-0 z-[150] flex flex-col items-center justify-center gap-6 bg-ink">
        <div data-iword className="flex overflow-hidden font-serif text-2xl tracking-[0.08em] text-pearl md:text-4xl">
          {"CUTS ’N’ SHADES".split("").map((c, i) => (
            <span key={i} className={i >= 5 && i <= 7 ? "text-fuchsia" : ""}>
              {c === " " ? " " : c}
            </span>
          ))}
        </div>
        <div data-iline className="h-px w-[min(80vw,720px)] origin-left bg-fuchsia" />
      </div>

      <div data-hero-media className="absolute inset-0">
        <LazyVideo
          eager
          src={vid("hero")}
          poster={img(45893)}
          mobileSrc={vid("hero-mobile")}
          mobilePoster={img(50782)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(209,34,115,0.18),transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-28 md:px-10 md:pb-20">
        <p data-hfade className="eyebrow mb-6 flex items-center gap-3 text-blush">
          <span className="h-px w-10 bg-fuchsia" />
          {SITE.name} · {SITE.city}
        </p>
        <h1 className="display text-[3.4rem] text-pearl sm:text-7xl md:text-[8.5rem] lg:text-[10.5rem]">
          <span data-hl className="line-mask"><span>Beauty with</span></span>
          <span data-hl className="line-mask">
            <span>
              an <em className="text-fuchsia">edge.</em>
            </span>
          </span>
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p data-hfade className="max-w-md text-[0.95rem] leading-relaxed text-silver md:text-base">
            Hair, makeup, skin, lashes, nails and advanced beauty services — all under one roof.
          </p>
          <div data-hfade className="flex flex-wrap gap-3">
            <a href="#services" data-magnetic className="btn text-pearl">
              Explore services
            </a>
            <a href={LINKS.book} {...EXTERNAL} data-magnetic data-cursor="book" className="btn btn-solid">
              Book appointment <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <a
        href="#intro"
        data-hfade
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-silver md:flex"
      >
        <span className="eyebrow !text-[0.6rem]">Scroll to discover</span>
        <ArrowDown className="size-4 animate-bounce text-fuchsia" />
      </a>
    </section>
  );
}
