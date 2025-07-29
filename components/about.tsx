"use client"

import { useEffect, useRef, useState } from "react"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-stone-50" id="about">
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-6 tracking-widest">OUR STORY</h2>
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
                  src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Couple engagement photo"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Botanical corner decoration */}
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
              <p className="text-base font-light tracking-wide">
                With God's grace and the blessings of our families, Jestin and Anjana are ready to begin their forever
                journey together. Our love story is one of faith, friendship, and divine timing.
              </p>
              <p className="text-base font-light tracking-wide">
                We met through mutual friends and quickly discovered our shared values, dreams, and love for our faith.
                After years of courtship filled with laughter, prayers, and countless memories, we're excited to unite
                as one.
              </p>
              <div className="pt-4">
                <div className="w-12 h-px bg-amber-400 mb-4"></div>
                <p className="text-amber-700 font-light italic text-center tracking-wide">
                  "Two are better than one, because they have a good return for their labor."
                </p>
                <p className="text-stone-500 text-sm text-center mt-2 tracking-widest">ECCLESIASTES 4:9</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
