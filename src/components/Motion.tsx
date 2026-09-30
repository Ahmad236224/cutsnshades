"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global, attribute-driven animation system. Rendered last on the page so
 * pinned sections (created by their own components) are registered first.
 *  data-lines      – children `.line-mask > span` rise in
 *  data-clip       – clip-path wipe reveal (+ inner media settles from 1.15 scale)
 *  data-fade       – soft rise + fade
 *  data-parallax   – vertical drift, value = strength (e.g. "12")
 *  data-draw       – thin line draws left→right
 *  data-magnetic   – element leans toward the pointer
 */
export default function Motion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let lenis: Lenis | null = null;
    const tick = (t: number) => lenis?.raf(t * 1000);
    if (!reduced && fine) {
      lenis = new Lenis({ lerp: 0.1 });
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Smooth anchor navigation
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!;
      const el = id === "#home" ? document.body : document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.4 });
      else (el as HTMLElement).scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) => {
        gsap.from(el.querySelectorAll(".line-mask > span"), {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        const dir = el.dataset.clip || "up";
        const from =
          dir === "left"
            ? "inset(0% 100% 0% 0%)"
            : dir === "diag"
              ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
              : "inset(100% 0% 0% 0%)";
        const to = dir === "diag" ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : "inset(0% 0% 0% 0%)";
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%" } });
        tl.fromTo(el, { clipPath: from }, { clipPath: to, duration: 1.3, ease: "expo.inOut" });
        const media = el.querySelector("img, video");
        if (media) tl.from(media, { scale: 1.18, duration: 1.8, ease: "expo.out" }, 0.1);
      });

      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          delay: Number(el.dataset.fade) || 0,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const s = Number(el.dataset.parallax) || 10;
        gsap.fromTo(
          el,
          { yPercent: -s },
          {
            yPercent: s,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((el) => {
        gsap.to(el, { xPercent: -50, ease: "none", duration: Number(el.dataset.marquee) || 30, repeat: -1 });
      });
    });

    // Magnetic buttons
    const cleanups: (() => void)[] = [];
    if (fine && !reduced) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        });
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      cleanups.forEach((c) => c());
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return <div className="grain" aria-hidden />;
}
