"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Clock, Church, Calendar } from "lucide-react"

export default function Details() {
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
    <section ref={sectionRef} className="py-20 px-4 bg-white" id="details">
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-6 tracking-widest">WEDDING DETAILS</h2>
          <div className="w-16 h-px bg-amber-400 mx-auto"></div>
        </div>

        <div
          className={`bg-stone-50 border border-amber-200 p-12 md:p-16 shadow-sm transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Church className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-light text-stone-800 mb-4 tracking-widest">WEDDING CEREMONY</h3>
            <p className="text-stone-600 font-light tracking-wide">
              Join us as we exchange vows in the presence of God
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-center md:items-start text-stone-700">
                <Calendar className="w-6 h-6 mr-0 md:mr-4 mb-2 md:mb-0 text-amber-600" />
                <div>
                  <p className="font-light text-lg tracking-wide">THURSDAY, AUGUST 28TH</p>
                  <p className="text-stone-500 font-light tracking-widest text-sm">2025</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start text-stone-700">
                <Clock className="w-6 h-6 mr-0 md:mr-4 mb-2 md:mb-0 text-amber-600" />
                <div>
                  <p className="font-light text-lg tracking-wide">11:00 AM</p>
                  <p className="text-stone-500 font-light tracking-widest text-sm">CEREMONY BEGINS</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-center md:items-start text-stone-700">
                <MapPin className="w-6 h-6 mr-0 md:mr-4 mb-2 md:mb-0 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-light text-lg tracking-wide mb-2">LOURDES METROPOLITAN CATHEDRAL</p>
                  <p className="text-stone-500 text-sm font-light tracking-wide leading-relaxed">
                    A sacred place where we will begin our journey as husband and wife
                  </p>
                  <button className="text-amber-600 hover:text-amber-700 mt-3 text-sm font-light tracking-widest">
                    DIRECTIONS →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative botanical element */}
          <div className="flex justify-center mt-12">
            <svg viewBox="0 0 100 20" className="w-24 h-6 text-green-600 opacity-40">
              <path
                d="M10,10 Q25,5 40,10 Q55,15 70,10 Q85,5 90,10"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="25" cy="8" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="55" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="75" cy="8" r="1.5" fill="currentColor" opacity="0.6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
