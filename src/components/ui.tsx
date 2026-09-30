import type { ReactNode } from "react";
import Image from "next/image";

/** Multi-line display heading with per-line mask reveal (animated by Motion). */
export function Lines({ lines, className = "", as: Tag = "h2" }: { lines: ReactNode[]; className?: string; as?: "h2" | "h3" | "p" }) {
  return (
    <Tag data-lines className={`display ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask">
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p data-fade className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className="h-px w-8 bg-fuchsia" />
      {children}
    </p>
  );
}

/** Huge outlined chapter number. */
export function ChapterNo({ n, className = "" }: { n: string; className?: string }) {
  return (
    <span
      aria-hidden
      data-fade
      className={`pointer-events-none relative z-20 mb-4 block select-none font-serif text-[5.5rem] leading-[0.85] text-transparent [-webkit-text-stroke:1.5px_currentColor] md:absolute md:mb-0 md:text-[15rem] ${className}`}
    >
      {n}
    </span>
  );
}

/** Image in a clip-reveal frame with parallax drift. */
export function Frame({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  clip = "up",
  parallax = 8,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  clip?: "up" | "left" | "diag";
  parallax?: number;
  priority?: boolean;
}) {
  return (
    <div data-clip={clip} className={`relative overflow-hidden ${className}`}>
      <div data-parallax={parallax} className="absolute -inset-y-[12%] inset-x-0">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}

export function ServiceList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`divide-y border-y ${className}`}>
      {items.map((s, i) => (
        <li
          key={s}
          data-fade={i * 0.04}
          className="group flex items-center justify-between py-3.5 text-[0.95rem] tracking-wide transition-[padding] duration-500 hover:pl-3"
        >
          <span>{s}</span>
          <span className="h-px w-0 bg-fuchsia transition-all duration-500 group-hover:w-10" />
        </li>
      ))}
    </ul>
  );
}
