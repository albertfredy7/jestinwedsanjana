"use client";

import { Phone } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

// Logo component
const Logo = () => {
  return (
    <Link
      href="#"
      className="font-playfair text-amber-600 text-5xl font-semibold tracking-wide relative z-20"
    >
      <span className=" pb-1">J</span>
      <span className="text-2xl mx-1 text-amber-600">❤</span>
      <span className=" pb-1">A</span>
    </Link>
  );
};

// Footer component
export default function Footer() {
  // Updated with the exact embed URL you provided
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.7149046602703!2d76.22512941180331!3d10.523106289567366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7efb47d2b592b%3A0x62bcee38dc80ae54!2sOur%20Lady%20of%20Lourdes%20Metropolitan%20Cathedral!5e0!3m2!1sen!2sin!4v1754550714431!5m2!1sen!2sin";

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