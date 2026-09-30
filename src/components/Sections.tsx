import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import LazyVideo from "./LazyVideo";
import { ChapterNo, Eyebrow, Frame, Lines, ServiceList } from "./ui";
import { Wordmark } from "./Nav";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./icons";
import { EXTERNAL, LINKS, SITE, img, vid } from "@/lib/site";

/* ───────────────────────── Brand intro ───────────────────────── */
export function BrandIntro() {
  return (
    <section id="intro" data-theme="light" className="relative overflow-hidden bg-pearl px-4 py-24 text-ink md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-7">
          <Eyebrow className="text-wine">The Cuts ’n’ Shades experience</Eyebrow>
          <Lines
            className="mt-8 text-[3.3rem] md:text-[7rem]"
            lines={["Everything beauty,", <em key="i" className="text-fuchsia">in one place.</em>]}
          />
          <p data-fade className="mt-8 max-w-md text-base leading-relaxed text-char/75">
            One address for the cut, the colour, the glow and the finishing touches — delivered by a team that also
            teaches the craft.
          </p>
        </div>
        <div className="relative md:col-span-5 md:pt-24">
          <div className="relative ml-auto aspect-[4/5] w-[88%] md:w-full">
            <Frame src={img(33257)} alt="Stylist finishing long, glossy hair in the salon" className="angled h-full" parallax={10} />
          </div>
          <div className="absolute -bottom-10 left-0 aspect-square w-[46%] border-8 border-pearl md:-left-24 md:w-[48%]">
            <Frame src={img(52165)} alt="Close-up of a skin treatment" className="h-full" clip="left" parallax={6} sizes="30vw" />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 grid max-w-[1600px] items-end gap-10 md:mt-32 md:grid-cols-12">
        <div data-clip="diag" className="relative aspect-[3/4] overflow-hidden md:col-span-3 md:col-start-2">
          <LazyVideo src={vid("lashes-apply")} poster={img(4718)} />
          <span className="eyebrow absolute bottom-3 left-3 bg-ink/70 px-2 py-1 !text-[0.55rem] text-pearl">Lash studio</span>
        </div>
        <div className="grid grid-cols-3 gap-6 md:col-span-7 md:col-start-6">
          {[
            ["Hair", "Cut · Colour · Care"],
            ["Beauty", "Makeup · Bridal · Skin"],
            ["Detail", "Lashes · Nails · SPMU"],
          ].map(([t, s], i) => (
            <div key={t} data-fade={i * 0.1} className="border-t border-ink/15 pt-4">
              <p className="font-serif text-3xl md:text-5xl">{t}</p>
              <p className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-char/60">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Services header ───────────────────────── */
export function ServicesHeader() {
  const marquee = "Hair · Makeup · Bridal · Skin · Lashes · Nails · SPMU · Laser · Academy · ";
  return (
    <section id="services" data-theme="dark" className="relative overflow-hidden bg-ink pb-10 pt-24 md:pt-36">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 md:flex-row md:items-end md:justify-between md:px-10">
        <Lines className="text-[4rem] md:text-[9rem]" lines={["Our", <em key="s" className="text-fuchsia">signatures.</em>]} />
        <p data-fade className="max-w-sm text-silver">Five chapters. One point of view. Scroll through what we do best.</p>
      </div>
      <div className="mt-16 overflow-hidden border-y border-white/10 py-5">
        <div data-marquee="40" className="flex w-max whitespace-nowrap font-serif text-4xl italic text-pearl/80 md:text-6xl">
          <span>{marquee.repeat(2)}</span>
          <span>{marquee.repeat(2)}</span>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 03 Skin ───────────────────────── */
export function Skin() {
  return (
    <section id="beauty" data-theme="light" className="relative overflow-hidden bg-gradient-to-b from-pearl to-blush/60 px-4 py-24 text-ink md:px-10 md:py-40">
      <ChapterNo n="03" className="absolute -right-4 top-10 text-wine/30" />
      <div className="relative mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow className="text-wine">03 — Skin &amp; aesthetics</Eyebrow>
          <Lines className="mt-8 text-[3.6rem] md:text-[7rem]" lines={["Skin,", <em key="r" className="text-fuchsia">refined.</em>]} />
          <p data-fade className="mt-6 max-w-sm text-char/75">
            Considered facials and advanced treatments, tailored after a proper skin consultation.
          </p>
          <ServiceList
            className="mt-10 divide-ink/10 border-ink/10"
            items={["Facials", "Advanced skin treatments", "Peels", "Aesthetic treatments", "Laser services", "Skin prep"]}
          />
        </div>
        <div className="relative md:col-span-7">
          <div data-clip="up" className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] md:aspect-[5/6]">
            <LazyVideo src={vid("skin-led")} poster={img(52154)} />
          </div>
          <div className="absolute -bottom-8 -left-2 aspect-[4/3] w-1/2 border-8 border-pearl md:-left-16 md:w-[42%]">
            <Frame src={img(49258)} alt="Facial treatment with a roller" className="h-full" clip="left" sizes="30vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 04 Lashes & Nails ───────────────────────── */
export function LashesNails() {
  const half = (label: string, src: string, poster: string, items: string[]) => (
    <div className="group relative h-[78svh] overflow-hidden md:h-[100svh]">
      <div className="absolute inset-0 transition-transform duration-[1.6s] ease-[var(--ease-lux)] group-hover:scale-105">
        <LazyVideo src={src} poster={poster} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
        <p className="eyebrow text-blush">{label}</p>
        <ul className="mt-4 space-y-1">
          {items.map((s) => (
            <li key={s} className="font-serif text-2xl transition-transform duration-500 hover:translate-x-2 hover:text-blush md:text-4xl">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  return (
    <section data-theme="dark" className="relative bg-ink">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center px-4 pt-24 text-center md:pt-28">
        <Eyebrow className="text-blush">04 — Lashes &amp; nails</Eyebrow>
        <Lines className="mt-5 text-[3.2rem] md:text-[7rem]" lines={["The finishing", <em key="d" className="text-fuchsia">details.</em>]} />
      </div>
      <div className="grid md:grid-cols-2">
        {half("Lashes", vid("lashes"), img(40553), ["Lash Extensions", "Lash Lifting"])}
        {half("Nails", vid("nails"), img(13084), ["Nail Extensions", "Manicure", "Pedicure", "Nail Care"])}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-ink via-ink/60 to-transparent" />
      <div className="absolute inset-y-0 left-1/2 hidden w-px bg-fuchsia/50 md:block" />
    </section>
  );
}

/* ───────────────────────── 05 SPMU ───────────────────────── */
export function Spmu() {
  const items = [
    { t: "Permanent Makeup", d: "Soft, long-wear definition — consult first.", src: img(40548) },
    { t: "Brows", d: "Shaping and definition that frames the face.", src: img(40552) },
    { t: "Beauty Detailing", d: "Lines, lids and the small things that finish a look.", src: img(52052) },
    { t: "Piercing", d: "Ask the team about current services.", src: null },
  ];
  return (
    <section data-theme="dark" className="relative overflow-hidden bg-char px-4 py-24 md:px-10 md:py-40">
      <ChapterNo n="05" className="absolute -left-4 top-6 text-white/10" />
      <div className="relative mx-auto max-w-[1600px]">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-6">
            <Eyebrow className="text-blush">05 — SPMU &amp; beauty detail</Eyebrow>
            <Lines className="mt-8 text-[3.2rem] md:text-[6.5rem]" lines={["Precision,", "down to the", <em key="d" className="text-fuchsia">detail.</em>]} />
          </div>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items
            .filter((i) => i.src)
            .map((it, i) => (
              <div key={it.t} className={`group ${i === 1 ? "md:mt-24" : ""}`}>
                <div data-clip="up" className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={it.src!}
                    alt={it.t}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-lux)] group-hover:scale-110"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between border-t border-white/15 pt-4">
                  <h3 className="font-serif text-3xl">{it.t}</h3>
                  <span className="text-xs text-fuchsia">0{i + 1}</span>
                </div>
                <p className="mt-2 text-sm text-silver">{it.d}</p>
              </div>
            ))}
        </div>
        <p data-fade className="mt-14 text-center text-[0.7rem] uppercase tracking-[0.3em] text-silver/70">
          Also ask about · Piercing · Service availability varies
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── Fullscreen moment ───────────────────────── */
export function Moment() {
  return (
    <section data-theme="dark" className="relative h-[100svh] overflow-hidden bg-ink">
      <div data-parallax="6" className="absolute -inset-y-[8%] inset-x-0">
        <LazyVideo src={vid("eye")} poster={img(4257)} />
      </div>
      <div className="absolute inset-0 bg-ink/45" />
      <div className="relative flex h-full items-center justify-center px-4 text-center">
        <Lines className="text-[3rem] text-pearl md:text-[8rem]" lines={["Every detail", <>changes the <em className="text-blush">whole look.</em></>]} />
      </div>
    </section>
  );
}

/* ───────────────────────── Academy ───────────────────────── */
export function Academy() {
  const courses = ["Hair", "Makeup", "Skin", "Lashes", "Nails"];
  return (
    <section id="academy" data-theme="light" className="relative overflow-hidden bg-pearl px-4 py-24 text-ink md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow className="text-wine">Cuts ’n’ Shades Academy</Eyebrow>
            <Lines
              className="mt-8 text-[3.2rem] md:text-[7rem]"
              lines={["Learn the craft.", <>Build the <em className="text-fuchsia">confidence.</em></>]}
            />
          </div>
          <p data-fade className="self-end text-char/75 md:col-span-4 md:col-start-9">
            Hands-on training led by working artists — live demonstrations, guided practice and real salon standards.
            Course details are shared on enquiry.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
          <div data-clip="diag" className="relative col-span-2 aspect-video overflow-hidden md:col-span-7 md:aspect-auto md:h-[70vh]">
            <LazyVideo src={vid("academy")} poster={img(52055)} />
            <span className="eyebrow absolute left-4 top-4 bg-fuchsia px-2 py-1 !text-[0.55rem] text-pearl">Live demonstration</span>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-3 md:col-span-5 md:grid-cols-1 md:gap-5">
            <Frame src={img(40540)} alt="Makeup artist working with a model in the studio" className="aspect-square md:aspect-auto md:h-[calc(35vh-10px)]" clip="left" sizes="40vw" />
            <Frame src={img(52030)} alt="Makeup artist’s station with brushes and palettes" className="aspect-square md:aspect-auto md:h-[calc(35vh-10px)]" clip="up" sizes="40vw" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <ol className="flex flex-wrap gap-x-8 gap-y-3">
            {courses.map((c, i) => (
              <li key={c} data-fade={i * 0.06} className="group flex items-baseline gap-2">
                <span className="text-[0.6rem] text-fuchsia">0{i + 1}</span>
                <span className="font-serif text-4xl transition-colors group-hover:text-fuchsia md:text-6xl">{c}</span>
              </li>
            ))}
          </ol>
          <a href={LINKS.academy} {...EXTERNAL} data-magnetic className="btn self-start text-ink [--wipe:var(--color-ink)]">
            Discover the academy <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Testimonials ───────────────────────── */
export function Testimonials() {
  const quotes = [
    ["The whole experience felt modern, polished and personal.", "Salon client · Karachi"],
    ["They understood exactly the look I wanted.", "Makeup client · Karachi"],
    ["I walked out feeling like the sharpest version of myself.", "Bridal client · Karachi"],
  ];
  return (
    <section data-theme="dark" className="relative overflow-hidden bg-wine px-4 py-24 md:px-10 md:py-40">
      <span aria-hidden className="pointer-events-none absolute -top-16 left-2 font-serif text-[22rem] leading-none text-ink/25 md:text-[36rem]">
        “
      </span>
      <div className="relative mx-auto max-w-[1300px] space-y-24 md:space-y-36">
        {quotes.map(([q, l], i) => (
          <figure key={q} className={i % 2 ? "md:ml-auto md:max-w-[80%] md:text-right" : "md:max-w-[85%]"}>
            <Lines as="p" className="text-[2.3rem] leading-[1.05] text-pearl md:text-[5rem]" lines={[`“${q}”`]} />
            <figcaption data-fade className="eyebrow mt-8 text-blush">
              {l}
            </figcaption>
          </figure>
        ))}
        <p data-fade className="text-[0.6rem] uppercase tracking-[0.3em] text-blush/50">Demo testimonials — to be replaced with real client reviews</p>
      </div>
    </section>
  );
}

/* ───────────────────────── Social strip ───────────────────────── */
export function Social() {
  const tiles = [
    [36151, "Hair — curls in progress"],
    [40556, "Bridal — final powder"],
    [13084, "Nails — sculpted set"],
    [4718, "Lashes — extension application"],
    [52154, "Skin — LED facial"],
    [52055, "Academy — eye makeup demo"],
  ] as const;
  return (
    <section data-theme="dark" className="bg-ink py-24 md:py-36">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <Eyebrow className="text-blush">{SITE.instagramHandle}</Eyebrow>
          <Lines className="mt-6 text-[3.2rem] md:text-[7rem]" lines={["Fresh from", <em key="c" className="text-fuchsia">the chair.</em>]} />
        </div>
        <a href={LINKS.instagram} {...EXTERNAL} data-magnetic className="btn self-start text-pearl md:self-end">
          <InstagramIcon /> Follow {SITE.instagramHandle}
        </a>
      </div>
      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:grid md:grid-cols-6 md:overflow-visible md:px-10">
        {tiles.map(([id, alt], i) => (
          <a
            key={id}
            href={LINKS.instagram}
            {...EXTERNAL}
            data-fade={i * 0.06}
            data-cursor="view"
            className="group relative aspect-[4/5] w-[62vw] shrink-0 snap-start overflow-hidden md:w-auto"
          >
            <Image src={img(id)} alt={alt} fill sizes="(max-width:768px) 62vw, 17vw" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="text-xs text-pearl">{alt}</span>
            </div>
            <InstagramIcon className="absolute right-3 top-3 size-4 text-pearl/80" />
          </a>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Final CTA ───────────────────────── */
export function FinalCta() {
  return (
    <section id="contact" data-theme="dark" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      <div data-parallax="8" className="absolute -inset-y-[10%] inset-x-0">
        <LazyVideo src={vid("curls")} poster={img(51997)} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-wine/40" />
      <div className="relative mx-auto w-full max-w-[1600px] px-4 py-32 md:px-10">
        <Eyebrow className="text-blush">Book · {SITE.city}</Eyebrow>
        <Lines className="mt-8 text-[3.6rem] text-pearl md:text-[9rem]" lines={["Ready for", <>your next <em className="text-fuchsia">look?</em></>]} />
        <div data-fade className="mt-12 flex flex-wrap gap-3">
          <a href={LINKS.book} {...EXTERNAL} data-magnetic data-cursor="book" className="btn btn-solid">
            Book appointment <ArrowUpRight className="size-4" />
          </a>
          <a href={LINKS.whatsapp} {...EXTERNAL} data-magnetic className="btn text-pearl">
            <WhatsAppIcon /> WhatsApp us
          </a>
        </div>
        <a data-fade href={LINKS.phone} className="mt-8 inline-block text-sm tracking-[0.2em] text-silver hover:text-pearl">
          {SITE.phoneDisplay}
        </a>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */
export function Footer() {
  const services = [
    ["Hair", "#hair"],
    ["Makeup", "#bridal"],
    ["Skin", "#beauty"],
    ["Lashes", "#beauty"],
    ["Nails", "#beauty"],
    ["Academy", "#academy"],
    ["Gallery", "#gallery"],
    ["Contact", "#contact"],
  ];
  const social = [
    { l: "Instagram", h: LINKS.instagram, I: InstagramIcon },
    { l: "Facebook", h: LINKS.facebook, I: FacebookIcon },
    { l: "WhatsApp", h: LINKS.whatsapp, I: WhatsAppIcon },
  ];
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-ink px-4 pb-28 pt-24 md:px-10 md:pb-10">
      <div data-draw className="mx-auto h-px max-w-[1600px] bg-fuchsia/70" />
      <div className="mx-auto mt-16 grid max-w-[1600px] gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="mt-6 max-w-xs text-sm text-silver">
            Salon &amp; Academy — hair, makeup, bridal, skin, lashes, nails and beauty training in {SITE.city}.
          </p>
          <a href={LINKS.phone} className="mt-6 inline-block text-sm tracking-[0.15em] text-pearl hover:text-fuchsia">
            {SITE.phoneDisplay}
          </a>
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm md:col-span-4" aria-label="Footer">
          {services.map(([l, h]) => (
            <a key={l} href={h} className="text-silver transition-colors hover:text-fuchsia">
              {l}
            </a>
          ))}
        </nav>
        <div className="space-y-3 md:col-span-3">
          {social.map(({ l, h, I }) => (
            <a key={l} href={h} {...EXTERNAL} className="group flex items-center justify-between border-b border-white/10 pb-3 text-sm">
              <span className="flex items-center gap-3">
                <I className="size-4 text-fuchsia" /> {l}
              </span>
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
      <p aria-hidden className="mx-auto mt-20 max-w-[1600px] whitespace-nowrap text-center font-serif text-[11vw] leading-none tracking-tight text-pearl/95">
        CUTS <em className="text-fuchsia">’n’</em> SHADES
      </p>
      <div className="mx-auto mt-6 flex max-w-[1600px] flex-col justify-between gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-silver/60 md:flex-row">
        <span>Salon &amp; Academy · {SITE.city}</span>
        <span>© {new Date().getFullYear()} Cuts ’n’ Shades · Concept demo</span>
      </div>
    </footer>
  );
}
