"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { EXTERNAL, LINKS, NAV, SITE } from "@/lib/site";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./icons";

gsap.registerPlugin(ScrollTrigger);

type Theme = "top" | "dark" | "light";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="whitespace-nowrap font-serif text-[1.2rem] tracking-[0.02em] md:text-2xl">
        CUTS <span className="text-fuchsia italic">’n’</span> SHADES
      </span>
      <span className="mt-1 text-[0.55rem] font-semibold tracking-[0.42em] opacity-70">SALON &amp; ACADEMY</span>
    </span>
  );
}

export default function Nav() {
  const [theme, setTheme] = useState<Theme>("top");
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers = gsap.utils.toArray<HTMLElement>("[data-theme]").map((sec) =>
      ScrollTrigger.create({
        trigger: sec,
        start: "top 48px",
        end: "bottom 48px",
        onToggle: (self) => self.isActive && setTheme(window.scrollY < 60 ? "top" : (sec.dataset.theme as Theme)),
      }),
    );
    const onScroll = () => {
      if (window.scrollY < 60) setTheme("top");
      setPastHero(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const m = menuRef.current;
    if (!m) return;
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) {
      gsap.fromTo(m, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" });
      gsap.from(m.querySelectorAll("[data-mi]"), { yPercent: 120, duration: 0.9, stagger: 0.05, ease: "expo.out", delay: 0.3 });
    }
  }, [open]);

  const light = theme === "light" && !open;
  const bar =
    theme === "top" || open
      ? "bg-transparent text-pearl border-transparent"
      : light
        ? "bg-pearl/85 text-ink border-ink/10 backdrop-blur-xl"
        : "bg-ink/80 text-pearl border-white/10 backdrop-blur-xl";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] border-b transition-[background-color,color,border-color] duration-700 ease-[var(--ease-lux)] ${bar}`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:h-20 md:px-10">
          <a href="#home" aria-label="Cuts ’n’ Shades — home" onClick={() => setOpen(false)}>
            <Wordmark />
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="group relative text-[0.7rem] font-semibold uppercase tracking-[0.22em]">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-fuchsia transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={LINKS.instagram}
              {...EXTERNAL}
              aria-label="Instagram"
              className="hidden size-10 items-center justify-center rounded-full border border-current/25 transition-colors hover:border-fuchsia hover:text-fuchsia md:flex"
            >
              <InstagramIcon />
            </a>
            <a
              href={LINKS.whatsapp}
              {...EXTERNAL}
              aria-label="WhatsApp"
              className="hidden size-10 items-center justify-center rounded-full border border-current/25 transition-colors hover:border-fuchsia hover:text-fuchsia md:flex"
            >
              <WhatsAppIcon />
            </a>
            <a href={LINKS.book} {...EXTERNAL} data-cursor="book" data-magnetic className="btn btn-solid hidden !py-3 md:inline-flex">
              Book now
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex size-11 items-center justify-center rounded-full border border-current/25 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      <div
        ref={menuRef}
        hidden={!open}
        className="fixed inset-0 z-[110] flex flex-col bg-ink px-6 pb-8 pt-24 text-pearl lg:hidden"
        data-lenis-prevent
      >
        <div className="absolute left-0 right-0 top-20 h-px bg-fuchsia/60" />
        <nav className="flex flex-1 flex-col justify-center gap-1" aria-label="Mobile">
          {NAV.map((n, i) => (
            <span key={n.href} className="overflow-hidden">
              <a
                data-mi
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-1 font-serif text-[2.6rem] leading-tight"
              >
                <span className="font-sans text-[0.6rem] tracking-[0.3em] text-fuchsia">0{i + 1}</span>
                {n.label}
              </a>
            </span>
          ))}
        </nav>
        <div className="grid grid-cols-2 gap-3" data-mi>
          <a href={LINKS.book} {...EXTERNAL} className="btn btn-solid justify-center">
            Book now
          </a>
          <a href={LINKS.whatsapp} {...EXTERNAL} className="btn justify-center">
            <WhatsAppIcon /> WhatsApp
          </a>
        </div>
        <div className="mt-6 flex items-center justify-between text-silver" data-mi>
          <div className="flex gap-4">
            <a href={LINKS.instagram} {...EXTERNAL} aria-label="Instagram"><InstagramIcon className="size-5" /></a>
            <a href={LINKS.facebook} {...EXTERNAL} aria-label="Facebook"><FacebookIcon className="size-5" /></a>
            <a href={LINKS.phone} aria-label="Call"><Phone className="size-5" /></a>
          </div>
          <span className="eyebrow">{SITE.city}</span>
        </div>
      </div>

      {/* Sticky mobile CTAs */}
      <div
        className={`fixed inset-x-3 bottom-3 z-[100] grid grid-cols-[1fr_auto] gap-2 transition-all duration-700 ease-[var(--ease-lux)] md:hidden ${
          pastHero && !open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
        }`}
      >
        <a
          href={LINKS.book}
          {...EXTERNAL}
          className="flex h-14 items-center justify-center gap-2 rounded-full bg-fuchsia text-[0.72rem] font-bold uppercase tracking-[0.24em] text-pearl shadow-[0_10px_40px_-10px_rgba(209,34,115,0.8)]"
        >
          Book appointment <ArrowUpRight className="size-4" />
        </a>
        <a
          href={LINKS.whatsapp}
          {...EXTERNAL}
          aria-label="WhatsApp us"
          className="flex size-14 items-center justify-center rounded-full bg-pearl text-ink"
        >
          <WhatsAppIcon className="size-6" />
        </a>
      </div>
    </>
  );
}
