"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import LazyVideo from "./LazyVideo";
import { ChapterNo, Eyebrow, Lines, ServiceList } from "./ui";
import { EXTERNAL, LINKS, img, vid } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  { id: 16189, t: "Movement", s: "Long layers" },
  { id: 49556, t: "Blow dry", s: "Salon finish" },
  { id: 33099, t: "Treatments", s: "Wash & care" },
  { id: 49509, t: "Colour", s: "Rich, reflective tones" },
  { id: 40592, t: "Styling", s: "Occasion hair" },
  { id: 40598, t: "Finish", s: "Set & shine" },
];

export default function HairChapter() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const dist = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      t.querySelectorAll<HTMLElement>("[data-panel-img]").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: -12 },
          { xPercent: 12, ease: "none", scrollTrigger: { trigger: el.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true } },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="hair" data-theme="dark" className="relative bg-ink">
      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-4 pb-16 pt-12 md:grid-cols-12 md:px-10 md:pb-24">
        <ChapterNo n="01" className="text-fuchsia/70 md:right-10 md:top-0" />
        <div className="relative md:col-span-5">
          <Eyebrow className="text-blush">01 — Hair</Eyebrow>
          <Lines className="mt-8 text-[3.4rem] md:text-[6.5rem]" lines={["Shape.", "Color.", <em key="m" className="text-fuchsia">Movement.</em>]} />
          <ServiceList
            className="mt-10 grid grid-cols-2 gap-x-8 divide-white/10 border-white/10 [&>li]:border-b [&>li]:border-white/10"
            items={["Haircuts", "Blow Dry", "Color", "Highlights", "Hair Treatments", "Styling", "Straightening", "Extensions"]}
          />
          <a href={LINKS.book} {...EXTERNAL} data-magnetic data-cursor="book" className="btn mt-10 text-pearl">
            Explore hair <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="relative md:col-span-6 md:col-start-7">
          <div data-clip="up" className="angled relative aspect-[4/5] overflow-hidden">
            <LazyVideo src={vid("hair-curl")} poster={img(36151)} />
          </div>
        </div>
      </div>

      <div ref={pin} className="relative overflow-hidden md:h-[100svh]">
        <div
          ref={track}
          className="no-scrollbar flex h-full snap-x snap-mandatory items-center gap-4 overflow-x-auto px-4 pb-20 md:snap-none md:gap-8 md:overflow-visible md:px-10 md:pb-0"
        >
          <div className="hidden w-[28vw] shrink-0 md:block">
            <p className="eyebrow text-blush">The hair edit</p>
            <p className="display mt-4 text-6xl">
              Cut, colour
              <br />
              <em className="text-fuchsia">&amp; care.</em>
            </p>
            <p className="mt-6 max-w-xs text-sm text-silver">Scroll sideways through the looks our stylists create every day.</p>
          </div>
          {PANELS.map((p, i) => (
            <figure
              key={p.id}
              className={`group relative w-[78vw] shrink-0 snap-center md:w-[34vw] ${i % 2 ? "md:mt-24" : "md:-mt-16"}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden md:aspect-[4/5]">
                <div data-panel-img className="absolute inset-y-0 -inset-x-[14%]">
                  <Image
                    src={img(p.id)}
                    alt={`${p.t} — ${p.s}`}
                    fill
                    sizes="(max-width:768px) 78vw, 40vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-lux)] group-hover:scale-105"
                  />
                </div>
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between border-t border-white/15 pt-3">
                <span className="font-serif text-2xl md:text-3xl">{p.t}</span>
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-silver">{p.s}</span>
              </figcaption>
            </figure>
          ))}
          <div className="w-4 shrink-0 md:w-[10vw]" />
        </div>
      </div>
    </section>
  );
}
