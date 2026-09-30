"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LazyVideo from "./LazyVideo";
import { img, vid } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { t: "Choose", d: "Pick your service — hair, makeup, skin, lashes, nails or a full bridal package.", id: 52033 },
  { t: "Consult", d: "We talk through your face, hair, skin and the look you have in mind.", id: 24701 },
  { t: "Create", d: "Our artists get to work with professional products and a precise hand.", id: 52046, video: "create" },
  { t: "Refine", d: "Every detail is checked, softened or sharpened until it’s right.", id: 40541 },
  { t: "Reveal", d: "The mirror moment. Camera-ready, event-ready, you-ready.", id: 40589 },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 3}`,
        pin: true,
        scrub: true,
        onUpdate: (s) => {
          setIdx(Math.min(STEPS.length - 1, Math.floor(s.progress * STEPS.length)));
          gsap.set(bar.current, { scaleY: s.progress });
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const s = STEPS[idx];

  return (
    <section ref={root} data-theme="dark" className="relative h-[100svh] overflow-hidden bg-char">
      <div className="mx-auto grid h-full max-w-[1600px] grid-rows-[1fr_auto] gap-6 px-4 pb-24 pt-20 md:grid-cols-12 md:grid-rows-1 md:items-center md:gap-10 md:px-10 md:py-0">
        {/* Media stack */}
        <div className="relative order-1 h-full min-h-0 md:order-2 md:col-span-6 md:col-start-7 md:h-[74vh]">
          {STEPS.map((st, i) => (
            <div
              key={st.t}
              className="absolute inset-0 overflow-hidden transition-[clip-path] duration-[1.1s] ease-[var(--ease-lux)]"
              style={{ clipPath: i <= idx ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)", zIndex: i }}
            >
              {st.video ? (
                <LazyVideo src={vid(st.video)} poster={img(st.id)} />
              ) : (
                <Image src={img(st.id)} alt={`${st.t} step`} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
              )}
            </div>
          ))}
          <span className="absolute right-3 top-3 z-10 font-serif text-sm text-pearl/80">0{idx + 1} / 05</span>
        </div>

        {/* Copy */}
        <div className="order-2 md:order-1 md:col-span-5">
          <p className="eyebrow text-blush">The experience</p>
          <h2 className="display mt-4 hidden text-6xl md:block lg:text-7xl">
            From idea
            <br />
            <em className="text-fuchsia">to finished look.</em>
          </h2>
          <div className="mt-4 flex items-end gap-5 md:mt-12">
            <span key={`n${idx}`} className="animate-[rise_.8s_var(--ease-lux)] font-serif text-[5rem] leading-[0.8] text-fuchsia md:text-[9rem]">
              0{idx + 1}
            </span>
            <div key={`t${idx}`} className="animate-[rise_.9s_var(--ease-lux)] pb-1">
              <p className="font-serif text-3xl uppercase tracking-wide md:text-5xl">{s.t}</p>
              <p className="mt-2 max-w-sm text-sm text-silver md:text-base">{s.d}</p>
            </div>
          </div>
          <div className="mt-8 flex gap-2">
            {STEPS.map((st, i) => (
              <span key={st.t} className={`h-px flex-1 transition-colors duration-500 ${i <= idx ? "bg-fuchsia" : "bg-white/15"}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 hidden h-full w-px bg-white/10 md:block">
        <div ref={bar} className="h-full w-full origin-top bg-fuchsia" style={{ transform: "scaleY(0)" }} />
      </div>
    </section>
  );
}
