import Hero from "../components/hero"
import About from "../components/about"
import Details from "../components/details"
import Gallery from "../components/gallery"
import RSVP from "../components/rsvp"
import Footer from "../components/footer"
import GallerySection from "@/components/gallery-section"

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Hero />
      <About />
      <Details />
      {/* <Gallery /> */}
      <GallerySection/>
      <RSVP />
      <Footer />
      
    </main>
  )
}
