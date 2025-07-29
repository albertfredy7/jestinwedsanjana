"use client"

import { useEffect, useRef, useState } from "react"
import { X, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  
  // State to track navigation direction for animations
  const [direction, setDirection] = useState(0)

  const sectionRef = useRef<HTMLElement>(null)
  const touchStartRef = useRef<number | null>(null)

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])
  
  const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Romantic couple portrait",
    title: "Engagement Portrait",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Wedding ceremony moment",
    title: "Ceremony Moment",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Wedding rings exchange",
    title: "Ring Exchange",
  },
  // --- MODIFIED IMAGE 4 ---
  {
    id: 4,
    src: "https://media.istockphoto.com/id/1173488478/photo/the-most-beautiful-day-of-their-lives.jpg?s=612x612&w=0&k=20&c=xoAbApCFRMxSScg-CZBlCSDHd-0Yhaybh9FpbV7V38Q=",
    alt: "Couple walking down the aisle",
    title: "Just Married",
  },
  // --- MODIFIED IMAGE 5 ---
  {
    id: 5,
    src: "https://media.istockphoto.com/id/520971230/photo/bride-and-groom-walking-at-the-river.jpg?s=612x612&w=0&k=20&c=fMdcMaSfzqX2pkiu20bfjhsYAXlZEB1rNPFToPt9sow=",
    alt: "Bride and groom embrace outdoors",
    title: "A Quiet Moment",
  },
  // --- MODIFIED IMAGE 6 ---
  {
    id: 6,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKcZJnrrxQRdMFx6azRQgWoyehFqge8tvfylXV98dI3CaKuTcynOz-1Ps3qoLPGzL098M&usqp=CAU",
    alt: "Couple celebrating at their wedding reception",
    title: "Wedding Celebration",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Wedding cake cutting",
    title: "Cake Cutting",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Wedding venue decoration",
    title: "Venue Decoration",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Couple walking together",
    title: "Together Forever",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Wedding vows",
    title: "Wedding Vows",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Wedding celebration cheer",
    title: "Celebration",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Wedding kiss",
    title: "The Kiss",
  },
]


  const navigateImage = (newDirection: number) => {
    if (selectedImage === null) return
    const newIndex = selectedImage + newDirection
    if (newIndex >= 0 && newIndex < photos.length) {
      setDirection(newDirection)
      setSelectedImage(newIndex)
    }
  }

  const openLightbox = (index: number) => {
    setDirection(1) // Default to sliding in from the right when first opening
    setSelectedImage(index)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null)
      } else if (e.key === "ArrowLeft") {
        navigateImage(-1)
      } else if (e.key === "ArrowRight") {
        navigateImage(1)
      }
    }

    if (selectedImage !== null) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [selectedImage])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return
    const touchEnd = e.changedTouches[0].clientX
    const touchDiff = touchStartRef.current - touchEnd
    const minSwipeDistance = 50

    if (touchDiff > minSwipeDistance) {
      navigateImage(1) // Swipe Left -> Next Image
    } else if (touchDiff < -minSwipeDistance) {
      navigateImage(-1) // Swipe Right -> Previous Image
    }
    touchStartRef.current = null
  }
  
  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: "0%",
      opacity: 1,
      transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
    }),
  }

  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-white" id="gallery">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 font-playfair">Our Journey</h2>
          <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto font-playfair">
            A glimpse into our love story through the moments we've shared together.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`aspect-square rounded-2xl overflow-hidden shadow-lg transition-all duration-1000 hover:scale-105 cursor-pointer group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
              onClick={() => openLightbox(index)}
            >
              <div className="relative w-full h-full">
                <img src={photo.src || "/placeholder.svg"} alt={photo.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Animation */}
      <AnimatePresence initial={false} custom={direction}>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Download Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-16 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full"
              onClick={() =>
                downloadImage(
                  photos[selectedImage].src,
                  `jestin-anjana-${photos[selectedImage].title.toLowerCase().replace(/\s+/g, "-")}.jpg`,
                )
              }
            >
              <Download className="h-6 w-6" />
            </Button>

            {/* Previous Button */}
            {selectedImage > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full"
                onClick={() => navigateImage(-1)}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}

            {/* Next Button */}
            {selectedImage < photos.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full"
                onClick={() => navigateImage(1)}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            )}

            {/* Animated Image Container */}
            <div
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <motion.img
                key={selectedImage}
                src={photos[selectedImage].src || "/placeholder.svg"}
                alt={photos[selectedImage].alt}
                className="max-w-full max-h-[90vh] object-contain"
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              />
            </div>
            
            {/* Click outside to close */}
            <div className="absolute inset-0 -z-10" onClick={() => setSelectedImage(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
