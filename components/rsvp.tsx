"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Mail, Phone } from "lucide-react"

export default function RSVP() {
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
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden" id="rsvp">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">RSVP</h2>
          <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
          <p className="text-white/90 text-lg">
            We can't wait to celebrate with you! Please let us know if you'll be joining us.
          </p>
        </div>

        <Card
          className={`max-w-2xl mx-auto shadow-xl bg-white/95 backdrop-blur-sm transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <CardContent className="p-8">
            <div className="mb-8">
              <Heart className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-light text-gray-800 mb-4">Please Respond by August 1st, 2025</h3>
            </div>

            <div className="space-y-6">
              <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 text-lg rounded-full">
                RSVP Online
              </Button>

              <div className="text-gray-600">
                <p className="mb-4">Or contact us directly:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-amber-500" />
                    <span>jestin.anjana@wedding.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-amber-500" />
                    <span>(555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-50 rounded-xl">
              <p className="text-sm text-gray-600">
                <strong>Please include:</strong> Number of guests, dietary restrictions, and any special accommodations
                needed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
