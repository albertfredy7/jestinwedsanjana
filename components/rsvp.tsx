"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin } from "lucide-react";

export default function Countdown() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // --- Countdown Logic ---
  const calculateTimeLeft = () => {
    const weddingDate = new Date("2025-08-28T11:00:00").getTime();
    const now = new Date().getTime();
    const difference = weddingDate - now;
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Scroll Animation Logic ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const timerComponents = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];



  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 relative overflow-hidden"
      id="countdown"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{
          backgroundImage: "url('/gallery/016A6227.jpg')",
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
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 font-playfair">
            Countdown to Our Big Day
          </h2>
          <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
          <p className="text-white/90 text-lg font-playfair">
            The most awaited day is almost here. Join us as we count down the
            moments!
          </p>
        </div>

        {/* Glassmorphic Countdown Card */}
        <Card
          className={`max-w-2xl mx-auto transition-all duration-1000 delay-300 mb-12
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          bg-white/10 backdrop-blur-md border border-white/30 shadow-lg rounded-xl`}
        >
          <CardContent className="p-8">
            <div className="mb-8">
              <Heart className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-light text-white font-playfair">
                We're Getting Married!
              </h3>
            </div>

            {isClient && (
              <div className="flex justify-around items-start text-center">
                {timerComponents.map((component) => (
                  <div key={component.label} className="w-1/4">
                    <div className="text-4xl md:text-6xl font-bold text-amber-400 tracking-tighter">
                      {String(component.value).padStart(2, "0")}
                    </div>
                    <div className="text-sm uppercase text-white/80 tracking-widest mt-1">
                      {component.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 p-4 bg-white/20 text-white/90 rounded-xl border border-white/30">
              <p className="text-sm">
                <strong>Date & Time:</strong> August 28, 2025 at 11:00 AM
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Glassmorphic Map Card */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          

          
        </div>
      </div>
    </section>
  );
}
