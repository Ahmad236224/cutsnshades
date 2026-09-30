# Cuts ’n’ Shades — one-page luxury demo

Single-page sales concept for **Cuts ’n’ Shades Salon & Academy** (Karachi). Built to show the redesign direction: cinematic video, editorial layout, GSAP motion.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis · next/image · Lucide

## Where things live

- `src/lib/site.ts` — **all business info and links** (Instagram, Facebook, WhatsApp, phone, booking message). Edit here only.
- `src/app/page.tsx` — section order.
- `src/components/` — sections. `Motion.tsx` drives scroll animations via `data-*` attributes (`data-lines`, `data-clip`, `data-fade`, `data-parallax`, `data-magnetic`, `data-draw`).
- `public/media/i/*.webp` — stills, `public/media/v/*.mp4` — video loops.

## Temporary media

All photos/videos are **temporary placeholders** from [Mixkit](https://mixkit.co) (free Mixkit license); stills are frames from those clips, named by Mixkit video id (e.g. `50788.webp` = mixkit.co video 50788). Replace them with the salon’s own content before launch — keep file names or update the references in the components.

Testimonials are generic demo copy and are labelled as such.
