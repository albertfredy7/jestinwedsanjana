"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen relative overflow-hidden bg-stone-100">
      {/* Header/Navigation */}
      <div className="relative z-20 pt-8 pb-4">
        {/* Couple Names */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-light text-stone-800 tracking-wide">
            Jestin <span className="text-stone-400 mx-2">&</span> Anjana
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-center">
          <div className="flex items-center space-x-8 md:space-x-12 text-stone-600 font-light tracking-widest text-xs md:text-sm">
            <a href="#about" className="hover:text-stone-800 transition-colors uppercase">
              About Us
            </a>
            <a href="#details" className="hover:text-stone-800 transition-colors uppercase">
              Invitation
            </a>
            <a href="#details" className="hover:text-stone-800 transition-colors uppercase">
              Location
            </a>
            <a href="#rsvp" className="hover:text-stone-800 transition-colors uppercase">
              RSVP
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-12 md:pt-20">
        {/* Main Script Text */}
        <div
          className={`text-center mb-8 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl text-stone-700 mb-4 leading-tight">
            <span className="font-script italic">Me and you.</span>
            <br />
            <span className="font-script italic">Just us two.</span>
          </h2>
        </div>

        {/* Wedding Date */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-stone-600 text-lg md:text-xl font-light tracking-widest">28. 08. 2025.</p>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 md:h-3/5">
        <div
          className={`w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            backgroundImage: "url('/images/couple-landscape.jpg')",
          }}
        >
          {/* Subtle overlay for better text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
      </div>

      {/* Page indicator dots (like in the reference) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white/60 rounded-full"></div>
          <div className="w-6 h-2 bg-white/80 rounded-full"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
