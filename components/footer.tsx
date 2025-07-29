"use client"

import { cn } from "@/lib/utils"
import { Mail, Phone, Instagram } from "lucide-react"
import Link from "next/link"
import type React from "react"

export default function Footer() {
  const pages = [
    {
      title: "Ceremony Details",
      href: "#details",
    },
    {
      title: "Reception Info",
      href: "#details",
    },
    {
      title: "Accommodations",
      href: "#",
    },
    {
      title: "Registry",
      href: "#",
    },
  ]

  return (
    <div className="border-t border-amber-400/20 px-8 py-20 bg-[#fafaf9] w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-sm text-stone-600 justify-between items-start md:px-8">
        <div className="flex flex-col items-center justify-center w-full relative">
          <div className="mr-0 md:mr-4 md:flex mb-4">
            <Logo />
          </div>
          <ul className="transition-colors flex sm:flex-row flex-col hover:text-amber-700/80 text-stone-700 list-none gap-8">
            {pages.map((page, idx) => (
              <li key={"pages" + idx} className="list-none">
                <Link
                  className="transition-colors hover:text-amber-700 hover:font-medium font-playfair"
                  href={page.href}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
          <GridLineHorizontal className="max-w-7xl mx-auto mt-12" />
        </div>

        <div className="flex flex-col items-center text-center mt-8 space-y-4 max-w-2xl mx-auto">
          <p className="text-stone-600 leading-relaxed font-playfair">
            Thank you for being part of our special day. For questions or special accommodations, please contact us.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center mt-6">
            <a
              href="tel:+1-555-0123"
              className="flex items-center gap-2 text-stone-600 hover:text-amber-700 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium font-playfair">(555) 012-3456</span>
            </a>

            <a
              href="mailto:jestin.anjana@wedding.com"
              className="flex items-center gap-2 text-stone-600 hover:text-amber-700 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="font-medium font-playfair">jestin.anjana@wedding.com</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-8">
          <p className="text-stone-500 mb-4 tracking-wide font-playfair">With Love & Gratitude</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-amber-700 transition-colors">
              <Instagram className="h-5 w-5 text-stone-500" />
            </Link>
          </div>
        </div>

        <div className="flex sm:flex-row flex-col justify-center items-center w-full mt-8">
          <p className="text-stone-400 text-xs font-playfair">&copy; Jestin & Anjana Wedding 2025</p>
        </div>
      </div>
    </div>
  )
}

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string
  offset?: string
}) => {
  return (
    <div
      style={
        {
          "--background": "#fafaf9",
          "--color": "rgba(245, 158, 11, 0.3)",
          "--height": "1px",
          "--width": "15px",
          "--fade-stop": "85%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(245, 158, 11, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "w-[calc(100%+var(--offset))] h-[var(--height)]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  )
}

const Logo = () => {
  return (
    <Link href="#" className="font-playfair text-amber-700 text-4xl font-semibold tracking-wide relative z-20">
      <span className="border-b-2 border-amber-400/50 pb-1">J</span>
      <span className="text-2xl mx-1 text-stone-400">&</span>
      <span className="border-b-2 border-amber-400/50 pb-1">A</span>
    </Link>
  )
}
