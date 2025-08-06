import { getGalleryImages } from "@/lib/get-gallery-images";
import GalleryGrid from "./gallery-grid";

export default function GallerySection() {
  const galleryImages = getGalleryImages();

  if (galleryImages.length === 0) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Our Gallery</h2>
        <p className="text-muted-foreground text-lg">
          No images found in gallery.
        </p>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 font-playfair">
          Our Journey
        </h2>
        <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
        <p className="text-gray-600 max-w-2xl mx-auto font-playfair">
          A glimpse into our love story through the moments we've shared
          together.
        </p>
      </div>

      <GalleryGrid images={galleryImages} />
    </section>
  );
}
