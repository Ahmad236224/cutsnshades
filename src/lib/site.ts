// Central business info + links. Swap values here when real details change.
export const SITE = {
  name: "Cuts ’n’ Shades",
  tagline: "Salon & Academy",
  city: "Karachi",
  phoneDisplay: "0332 395 3973",
  phoneTel: "+923323953973",
  whatsappNumber: "923323953973",
  instagramHandle: "@cutsnshadesofficial",
};

export const LINKS = {
  instagram: "https://www.instagram.com/cutsnshadesofficial/",
  facebook: "https://www.facebook.com/CutsnShades/",
  whatsapp: `https://wa.me/${SITE.whatsappNumber}`,
  book: `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    "Hi Cuts ’n’ Shades! I’d like to book an appointment.",
  )}`,
  academy: `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    "Hi Cuts ’n’ Shades! I’d like to know more about the Academy courses.",
  )}`,
  phone: `tel:${SITE.phoneTel}`,
};

export const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

export const NAV = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Hair", href: "#hair" },
  { label: "Beauty", href: "#beauty" },
  { label: "Academy", href: "#academy" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

// Temporary demo media (Mixkit free license). Replace with salon content later.
export const img = (id: string | number) => `/media/i/${id}.webp`;
export const vid = (name: string) => `/media/v/${name}.mp4`;
