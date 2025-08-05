"use client"

import { Phone } from "lucide-react"
import Link from "next/link"

// This is the main Footer component you'll use
export default function Footer() {
  return (
    <div className="border-t border-amber-400/20 px-8 py-20 bg-[#fafaf9] w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-sm text-stone-600">
        <div className="flex flex-col items-center justify-center w-full relative space-y-8 text-center">
          {/* 1. Logo */}
          <Logo />
          
          {/* 2. Inviting Message */}
          <p className="text-stone-600 leading-relaxed font-playfair text-base max-w-lg">
            We can't wait to celebrate our special day with you. Your presence is the greatest gift of all.
          </p>
          
          {/* 3. Phone Number */}
          <a
            href="tel:+1-555-123-4567" // You can update this with the real phone number
            className="flex items-center gap-2 text-stone-600 hover:text-amber-700 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="font-medium font-playfair">(555) 123-4567</span>
          </a>
        </div>
      </div>
    </div>
  )
}

// Logo component used in the footer
const Logo = () => {
  return (
    <Link href="#" className="font-playfair text-amber-700 text-4xl font-semibold tracking-wide relative z-20">
      <span className="border-b-2 border-amber-400/50 pb-1">J</span>
      <span className="text-2xl mx-1 text-stone-400">&</span>
      <span className="border-b-2 border-amber-400/50 pb-1">A</span>
    </Link>
  )
}
