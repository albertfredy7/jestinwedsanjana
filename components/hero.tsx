"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion"

// LOGO COMPONENT (No changes)
const Logo = () => {
  return (
    <Link href="#" className="font-playfair text-amber-600 text-5xl font-semibold tracking-wide relative z-20">
      <span className=" pb-1">J</span>
      <span className="text-2xl mx-1 text-stone-400">&</span>
      <span className=" pb-1">A</span>
    </Link>
  )
}

// DECORATIVE CARD COMPONENT (No changes)
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

// --- MOBILE STACK COMPONENTS ---

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
  // MODIFIED: Added 'caption' to the card data type
  cardsData?: { id: number; img: string; caption: string }[];
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
  // FIX: Generate random rotations once on the client side to avoid hydration mismatch
  const [randomRotations, setRandomRotations] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Generate random rotations only on client side after mounting
    if (randomRotation) {
      setRandomRotations(cardsData.map(() => Math.random() * 10 - 5));
    }
  }, [cardsData, randomRotation]);

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  // Don't render with random rotations until client-side hydration is complete
  if (!isMounted) {
    return (
      <div
        className="relative"
        style={{
          width: cardDimensions.width,
          height: cardDimensions.height,
          perspective: 600,
        }}
      >
        {cards.map((card, index) => (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="bg-white p-3 rounded-2xl shadow-xl"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - 1 - index) * 4, // No random rotation during SSR
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
                height: 'auto',
              }}
            >
              <div className="relative aspect-square w-full">
                <img
                  src={card.img}
                  alt={card.caption}
                  className="rounded-md object-cover w-full h-full pointer-events-none"
                />
              </div>
              <p className="text-center text-sm font-medium text-gray-800 mt-2 font-sans">
                {card.caption}
              </p>
            </motion.div>
          </CardRotate>
        ))}
      </div>
    );
  }

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
        const randomRotate = randomRotation && randomRotations[index] ? randomRotations[index] : 0;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              // MODIFIED: Changed styling to match DecorCard
              className="bg-white p-3 rounded-2xl shadow-xl"
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
                // MODIFIED: Adjusted height to be auto to accommodate caption
                height: 'auto',
              }}
            >
              {/* MODIFIED: Added inner structure to match DecorCard */}
              <div className="relative aspect-square w-full">
                <img
                  src={card.img}
                  alt={card.caption}
                  className="rounded-md object-cover w-full h-full pointer-events-none"
                />
              </div>
              <p className="text-center text-sm font-medium text-gray-800 mt-2 font-sans">
                {card.caption}
              </p>
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

  // MODIFIED: Data for the mobile stack now includes captions
  const stackPhotos = [
    { id: 1, img: "/gallery-webp/016A6227.webp", caption: "Jestin & Anjana" },
    { id: 2, img: "/gallery-webp/016A6267.webp", caption: "Our Forever" },
    { id: 3, img: "/gallery-webp/016A6963.webp", caption: "Save The Date" },
  ];

  return (
    <section className="relative w-full h-full  min-h-screen bg-white overflow-hidden pb-20 lg:pb-0">
      {/* Decorative Floating Cards (Desktop Only) */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
         <DecorCard
          imageUrl="/gallery-webp/016A6227.webp"
          altText="Romantic couple portrait"
          caption="Jestin & Anjana"
          className="top-[10%] left-[5%] xl:left-[12%] transform -rotate-12"
          animationDelay="500ms"
        />
        <DecorCard
          imageUrl="/gallery-webp/016A6267.webp"
          altText="Wedding rings exchange"
          caption="Our Forever"
          className="bottom-[15%] left-[8%] xl:left-[18%] transform rotate-6"
          animationDelay="900ms"
        />
        <DecorCard
          imageUrl="/gallery-webp/016A6963.webp"
          altText="Wedding ceremony in church"
          caption="Save The Date"
          className="top-[12%] right-[3%] xl:right-[10%] transform rotate-12"
          animationDelay="700ms"
        />
        <DecorCard
          imageUrl="/gallery-webp/016A8135.webp"
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
      <div className="font-playfair relative z-20 flex flex-col items-center justify-center text-center px-4 pt-10 md:pt-20 lg:mt-32 pb-10">
        <p className="text-gray-700 text-sm md:text-base lg:text-xl tracking-wide uppercase mb-2">
          With God's grace, we begin our forever
        </p>
        <h2 className="text-6xl md:text-6xl lg:text-7xl font-playfair text-amber-600 mb-6">
          Jestin <span className="text-xl text-amber-700 ">&</span> Anjana
        </h2>
        <p className="text-gray-700 mb-4 text-sm md:text-base lg:text-xl max-md:px-[10%]">Invite you to join our wedding celebration on</p>
        <div className="text-gray-800 font-medium text-sm md:text-base lg:text-xl mb-2">
          <div className="flex justify-center items-center space-x-4">
            <span className="text-sm md:text-base lg:text-xl text-gray-600">📅 Thursday</span>
            <span className="text-sm md:text-base lg:text-xl font-bold">28</span>
            <span className="text-sm md:text-base lg:text-xl text-gray-600">🕚 11 AM</span>
          </div>
          <div className="text-sm md:text-base lg:text-xl mt-1">August 2025</div>
        </div>
        <div className="flex justify-center items-center text-gray-700 space-x-2 mt-4">
          <MapPin className="w-5 h-5 text-amber-600 " />
          <span className="text-sm md:text-base lg:text-xl">Lourdes Metropolitan Cathedral</span>
        </div>
      </div>

      {/* Mobile Image Stack (Mobile Only) */}
      <div className="relative z-20 lg:hidden w-full flex justify-center mt-8">
        <Stack
          randomRotation={true}
          sensitivity={150}
          // MODIFIED: Adjusted dimensions to better fit the new card style
          cardDimensions={{ width: 240, height: 240 }}
          cardsData={stackPhotos}
        />
      </div>

    </section>
  )
}