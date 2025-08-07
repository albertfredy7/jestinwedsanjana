import Hero from "../components/hero";
import About from "../components/about";
import Details from "../components/details";
import Gallery from "../components/gallery";
import RSVP from "../components/rsvp";
import Footer from "../components/footer";
import GallerySection from "@/components/gallery-section";
import { ReactLenis } from "lenis/react";

export default function Page() {
  return (
    <ReactLenis
      root
      options={{
        duration: 2,
        infinite: false,
      }}
    >
      <main className="min-h-screen overflow-hidden">
        <Hero />
        <About />
        <Details />
        {/* <Gallery /> */}
        <GallerySection />
        <RSVP />
        <Footer />
      </main>
    </ReactLenis>
  );
}
