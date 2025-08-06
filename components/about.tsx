"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-stone-50" id="about">
      <div className="max-w-5xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-6 tracking-widest">
            OUR STORY
          </h2>
          <div className="w-16 h-px bg-amber-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-xl border border-amber-200">
                <img
                  src="/gallery-webp/016A7855.webp"
                  alt="Couple engagement photo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16">
                <svg viewBox="0 0 60 60" className="w-full h-full text-green-600 opacity-40">
                  <path
                    d="M10,50 Q30,10 50,30 Q40,50 20,40 Q10,30 30,20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx="35" cy="25" r="2" fill="currentColor" opacity="0.6" />
                </svg>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p className="text-base font-light tracking-wide ">
                Join us as we tie the sacred knot of love and togetherness.
              </p>
              <p className="text-base font-light tracking-wide">
                With overflowing hearts and immense gratitude, we, Jestin and Anjana, joyfully invite you to celebrate
                with us as we step into the sacred covenant of marriage.
              </p>
              <p className="text-base font-light tracking-wide">
                From the moment our paths crossed, we knew God had a special plan for us. Our love story is a testament
                to His perfect timing and unfailing grace, a beautiful tapestry woven with shared dreams, unwavering
                support, and a deep, abiding faith that serves as the foundation of our relationship.
              </p>
              <p className="text-base font-light tracking-wide">
                We are so excited to share this momentous occasion with our beloved family and friends – those who have
                walked alongside us, uplifted us in prayer, and showered us with endless love. Your presence as we
                exchange our vows and commit our lives to one another will be the greatest gift.
              </p>
              <p className="text-base font-light tracking-wide">
                As we prepare to embark on this incredible journey, we pray for God's continued blessings upon our union
                and eagerly anticipate the joyous celebrations to come.
              </p>
              <div className="pt-4">
                {/* <div className="w-12 h-px bg-amber-400 mb-4"></div> */}
                <p className="text-amber-700 font-light italic text-center tracking-wide">
                  With love and anticipation,
                </p>
                <p className="text-stone-500 text-sm text-center mt-2 tracking-widest">J ❤ A</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
