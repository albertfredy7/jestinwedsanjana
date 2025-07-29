"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MapPin } from "lucide-react"

export default function Countdown() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // --- Countdown Logic ---
  const calculateTimeLeft = () => {
    const weddingDate = new Date("2025-08-28T11:00:00").getTime()
    const now = new Date().getTime()
    const difference = weddingDate - now
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  // --- Scroll Animation Logic ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 },
    )
    const currentRef = sectionRef.current
    if (currentRef) observer.observe(currentRef)
    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  const timerComponents = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

const locationCoordinates = "10.523327805752725,76.22787062889537"
  
// This URL uses the coordinates above to generate the map
const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${locationCoordinates}&z=15&output=embed`

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden" id="countdown">
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
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 font-playfair">Countdown to Our Big Day</h2>
          <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
          <p className="text-white/90 text-lg font-playfair">
            The most awaited day is almost here. Join us as we count down the moments!
          </p>
        </div>

        {/* Countdown Card */}
        <Card
          className={`max-w-2xl mx-auto shadow-xl bg-white/95 backdrop-blur-sm transition-all duration-1000 delay-300 mb-12 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <CardContent className="p-8">
            <div className="mb-8">
              <Heart className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-light text-gray-800 font-playfair">We're Getting Married!</h3>
            </div>

            {isClient && (
              <div className="flex justify-around items-start text-center">
                {timerComponents.map((component) => (
                  <div key={component.label} className="w-1/4">
                    <div className="text-4xl md:text-6xl font-bold text-amber-600 tracking-tighter">
                      {String(component.value).padStart(2, "0")}
                    </div>
                    <div className="text-sm uppercase text-gray-500 tracking-widest mt-1">
                      {component.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-8 p-4 bg-amber-50 rounded-xl">
              <p className="text-sm text-gray-600">
                <strong>Date & Time:</strong> August 28, 2025 at 11:00 AM
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Map Section */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mx-auto text-center mb-6">
            <MapPin className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h3 className="text-3xl font-light text-white font-playfair">Wedding Venue</h3>
          </div>
          <Card className="max-w-2xl mx-auto shadow-xl bg-white/95 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wedding Venue Location"
                ></iframe>
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </section>
  )
}
