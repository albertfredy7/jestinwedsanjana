"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import type { GalleryImage } from "@/lib/get-gallery-images";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);

  const slides = useMemo(
    () => images.map((img) => ({ src: img.src, title: img.title })),
    [images]
  );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image, idx) => (
          <Card
            key={image.filename}
            className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => {
              setIndex(idx);
              setOpen(true);
            }}
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={image.thumbnailSrc || "/placeholder.svg"}
                alt={image.alt}
                fill
                placeholder="empty"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                priority={idx < 2}
                loading={idx < 2 ? undefined : "lazy"}
              />
            </div>
          </Card>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </>
  );
}
