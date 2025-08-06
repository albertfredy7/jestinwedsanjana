"use client";

import { Phone } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

// Logo component
const Logo = () => (
  <Link
    href="#"
    className="font-playfair text-amber-600 text-4xl font-semibold tracking-wide relative z-20"
  >
    <span className="border-b-2 border-amber-400/50 pb-1">J</span>
    <span className="text-2xl mx-1 text-stone-400">&</span>
    <span className="border-b-2 border-amber-400/50 pb-1">A</span>
  </Link>
);

// Footer component
export default function Footer() {
  const locationCoordinates = "10.523327805752725,76.22787062889537";
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${locationCoordinates}&z=17&output=embed`; // z=17 shows pin clearly

  return (
    <div
      className="relative lg:h-[600px] [clip-path:polygon(0_4%,100%_0,100%_100%,0_100%)]"
    >
      <div className="lg:fixed bottom-0 w-full bg-[#fafaf9] border-t border-amber-400/20">
        <footer className="w-full py-16">
          <div className="mx-auto max-w-7xl px-6 space-y-12 text-stone-600 text-sm">
            {/* Map */}
            <Card className="container mx-auto bg-white/10 backdrop-blur-md border border-white/30 shadow-none rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative w-full h-[250px]">
                  <iframe
                    src={googleMapsEmbedUrl}
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Wedding Venue Location"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Text and Contact */}
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <Logo />

              <p className="text-stone-600 leading-relaxed font-playfair text-base max-w-lg">
                We can't wait to celebrate our special day with you. Your presence
                is the greatest gift of all.
              </p>

              <a
                href="tel:+1-555-123-4567"
                className="flex items-center gap-2 text-stone-600 hover:text-amber-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="font-medium font-playfair">(555) 123-4567</span>
              </a>
            </div>

            {/* Optional bottom copyright */}
            <p className="text-center text-xs text-stone-400 mt-8">
              &copy; {new Date().getFullYear()} J & A. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
