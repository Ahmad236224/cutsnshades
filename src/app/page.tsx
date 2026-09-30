import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HairChapter from "@/components/HairChapter";
import Bridal from "@/components/Bridal";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import Cursor from "@/components/Cursor";
import Motion from "@/components/Motion";
import {
  Academy,
  BrandIntro,
  FinalCta,
  Footer,
  LashesNails,
  Moment,
  ServicesHeader,
  Skin,
  Social,
  Spmu,
  Testimonials,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BrandIntro />
        <ServicesHeader />
        <HairChapter />
        <Bridal />
        <Skin />
        <LashesNails />
        <Spmu />
        <Moment />
        <Academy />
        <Gallery />
        <Process />
        <Testimonials />
        <Social />
        <FinalCta />
      </main>
      <Footer />
      <Cursor />
      <Motion />
    </>
  );
}
