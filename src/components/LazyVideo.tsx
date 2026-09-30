"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
  eager?: boolean;
  /** Optional alternate source for small/portrait screens */
  mobileSrc?: string;
  mobilePoster?: string;
};

/** Muted loop that only loads/plays while on screen. */
export default function LazyVideo({ src, poster, className = "", eager, mobileSrc, mobilePoster }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const chosen = mobile && mobileSrc ? mobileSrc : src;
    if (mobile && mobilePoster) v.poster = mobilePoster;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const load = () => {
      if (!v.getAttribute("src")) v.src = chosen;
    };
    if (eager) load();

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          load();
          if (!reduced) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src, mobileSrc, mobilePoster, eager]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "none"}
      aria-hidden
      data-cursor="play"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
