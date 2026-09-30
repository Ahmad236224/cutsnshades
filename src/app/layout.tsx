import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";

const serif = Bodoni_Moda({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cuts ’n’ Shades — Salon & Academy, Karachi",
  description:
    "Hair, makeup, bridal, skin, lashes, nails and advanced beauty services — plus a training academy. Beauty with an edge.",
};

export const viewport: Viewport = { themeColor: "#0E0E10" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} antialiased`}>
      <head>
        <link rel="preload" as="image" href="/media/i/45893.webp" />
      </head>
      <body>{children}</body>
    </html>
  );
}
