"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion"

// LOGO COMPONENT
const Logo = () => {
  return (
    <Link href="#" className="font-playfair text-amber-700 text-5xl font-semibold tracking-wide relative z-20">
      <span className=" pb-1">J</span>
      <span className="text-2xl mx-1 text-stone-400">&</span>
      <span className=" pb-1">A</span>
    </Link>
  )
}

// DECORATIVE CARD COMPONENT (for Desktop)
interface DecorCardProps {
  imageUrl: string;
  altText: string;
  caption: string;
  className?: string;
  animationDelay?: string;
}

const DecorCard = ({ imageUrl, altText, caption, className, animationDelay }: DecorCardProps) => (
  <div
    className={`hidden lg:block absolute bg-white rounded-lg shadow-2xl p-3 w-56 animate-in fade-in zoom-in-75 duration-1000 ${className}`}
    style={{ animationDelay }}
  >
    <div className="relative aspect-square w-full">
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className="rounded-md object-cover"
        sizes="192px"
      />
    </div>
    <p className="text-center text-sm font-medium text-gray-800 mt-2 font-sans">
      {caption}
    </p>
  </div>
);


// --- MOBILE STACK COMPONENT (using your provided code) ---

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      // Snap back to center if not dragged far enough
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY, z: 100 }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string }[];
  animationConfig?: { stiffness: number; damping: number };
}

function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
}: StackProps) {
  const [cards, setCards] = useState(cardsData);

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
        const isTopCard = index === cards.length - 1;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - 1 - index) * 4 + randomRotate,
                scale: 1 + (index * 0.05) - (cards.length -1) * 0.05,
                transformOrigin: "bottom center",
                zIndex: index
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
              }}
            >
              <img
                src={card.img}
                alt={`card-${card.id}`}
                className="w-full h-full object-cover pointer-events-none"
              />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}


// HERO SECTION COMPONENT
export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Data for the mobile stack, using your gallery images
  const stackPhotos = [
    { id: 1, img: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 2, img: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 3, img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden pb-16 lg:pb-0">
      {/* Decorative Floating Cards (Desktop Only) */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
         <DecorCard
          imageUrl="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
          altText="Romantic couple portrait"
          caption="Jestin & Anjana"
          className="top-[10%] left-[5%] xl:left-[12%] transform -rotate-12"
          animationDelay="500ms"
        />
        <DecorCard
          imageUrl="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
          altText="Wedding rings exchange"
          caption="Our Forever"
          className="bottom-[15%] left-[8%] xl:left-[18%] transform rotate-6"
          animationDelay="900ms"
        />
        <DecorCard
          imageUrl="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
          altText="Wedding ceremony in church"
          caption="Save The Date"
          className="top-[12%] right-[3%] xl:right-[10%] transform rotate-12"
          animationDelay="700ms"
        />
        <DecorCard
          imageUrl="https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          altText="Wedding reception dance"
          caption="Our Special Day"
          className="bottom-[12%] right-[6%] xl:right-[15%] transform -rotate-8"
          animationDelay="1100ms"
        />
      </div>

      {/* Navigation */}
      <div className="relative flex justify-center z-20 pt-8 pb-4">
        <Logo/>
      </div>

      {/* Invitation Card Content */}
      <div className="font-playfair relative z-20 flex  flex-col items-center justify-center text-center px-4 pt-10 md:pt-20 pb-10">
        <p className="text-gray-700 text-sm md:text-base tracking-wide uppercase mb-2">
          With God’s grace, we begin our forever
        </p>
        <h2 className="text-6xl md:text-6xl font-playfair text-rose-500 mb-6">
          Jestin <span className="text-xl text-gray-600 ">&</span> Anjana
        </h2>
        <p className="text-gray-700 mb-4">Invite you to join our wedding celebration on</p>
        <div className="text-gray-800 font-medium text-lg mb-2">
          <div className="flex justify-center items-center space-x-4">
            <span className="text-sm text-gray-600">📅 Thursday</span>
            <span className="text-2xl font-bold">28</span>
            <span className="text-sm text-gray-600">🕚 11 AM</span>
          </div>
          <div className="text-sm mt-1">August 2025</div>
        </div>
        <div className="flex justify-center items-center text-gray-700 space-x-2 mt-4">
          <MapPin className="w-5 h-5 text-rose-400" />
          <span>Lourdes Metropolitan Cathedral</span>
        </div>
      </div>

      {/* Mobile Image Stack (Mobile Only) */}
      <div className="relative z-20 lg:hidden w-full flex justify-center mt-8">
        <Stack
          randomRotation={true}
          sensitivity={150}
          cardDimensions={{ width: 220, height: 220 }}
          cardsData={stackPhotos}
        />
      </div>

    </section>
  )
}
