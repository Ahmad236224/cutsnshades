"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import LazyVideo from "./LazyVideo";
import { ChapterNo, Eyebrow, Lines } from "./ui";
import { EXTERNAL, LINKS, img, vid } from "@/lib/site";

const EVENTS = [
  { k: "Nikkah", src: img(40597), note: "Soft, luminous, timeless" },
  { k: "Mehndi", src: img(50791), note: "Colour, gold and glow" },
  { k: "Baraat", src: img(50788), note: "Full glam, statement eyes" },
  { k: "Walima", src: img(40560), note: "Refined and radiant" },
  { k: "Engagement", src: img(51651), note: "Polished, camera-ready" },
];

export default function Bridal() {
  const [active, setActive] = useState(2);
  const stage = useRef<HTMLDivElement>(null);

  const pick = (i: number) => {
    if (i === active) return;
    setActive(i);
    const el = stage.current?.querySelector<HTMLElement>(`[data-ev="${i}"]`);
    if (el) gsap.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" });
  };

  return (
    <section id="bridal" data-theme="dark" className="relative overflow-hidden bg-wine px-4 py-24 md:px-10 md:py-40">
      <ChapterNo n="02" className="absolute -right-2 top-4 text-pearl/10" />
      <div className="relative mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow className="text-blush">02 — Makeup &amp; bridal</Eyebrow>
          <Lines className="mt-8 text-[3.4rem] md:text-[6.5rem]" lines={["Made for", <em key="m" className="text-blush">the moment.</em>]} />
          <ul className="mt-10 flex flex-wrap gap-2">
            {["Bridal Makeup", "Party Makeup", "Engagement Makeup", "Soft Glam", "Full Glam", "Event Makeup"].map((s, i) => (
              <li key={s} data-fade={i * 0.05} className="rounded-full border border-blush/30 px-4 py-2 text-xs uppercase tracking-[0.16em] text-blush transition-colors hover:border-pearl hover:bg-pearl hover:text-wine">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-14" role="tablist" aria-label="Bridal events">
            {EVENTS.map((e, i) => (
              <button
                key={e.k}
                role="tab"
                aria-selected={active === i}
                onMouseEnter={() => pick(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
                className="group flex w-full items-baseline justify-between border-b border-pearl/15 py-3 text-left"
              >
                <span className={`font-serif text-4xl uppercase tracking-wide transition-all duration-500 md:text-5xl ${active === i ? "translate-x-3 text-pearl" : "text-pearl/35"}`}>
                  {e.k}
                </span>
                <span className={`hidden text-[0.65rem] uppercase tracking-[0.2em] transition-opacity md:inline ${active === i ? "text-blush opacity-100" : "opacity-0"}`}>
                  {e.note}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative md:col-span-6 md:col-start-7">
          <div ref={stage} data-clip="diag" data-cursor="view" className="relative aspect-[4/5] overflow-hidden">
            {EVENTS.map((e, i) => (
              <div
                key={e.k}
                data-ev={i}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ zIndex: active === i ? 2 : 1, opacity: active === i ? 1 : 0 }}
              >
                <Image src={e.src} alt={`${e.k} makeup look`} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
              </div>
            ))}
            <span className="eyebrow absolute bottom-4 left-4 z-10 bg-ink/60 px-3 py-1.5 text-pearl backdrop-blur">{EVENTS[active].k}</span>
          </div>
          <div className="absolute -bottom-10 -left-4 z-10 aspect-[9/16] w-[34%] border-[6px] border-wine md:-left-20 md:w-[30%]">
            <LazyVideo src={vid("bride-powder")} poster={img(40556)} />
          </div>
          <a href={LINKS.book} {...EXTERNAL} data-magnetic data-cursor="book" className="btn btn-solid absolute -bottom-6 right-0 z-10 hidden md:inline-flex">
            Book bridal consult <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
