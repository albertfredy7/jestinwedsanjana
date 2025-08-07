// app/layout.tsx

import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script } from "next/font/google";
import ClientWrapper from "@/components/ClientWrapper"; // 1. Import the new wrapper
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dancing-script",
});

// This can stay here because this file remains a Server Component
export const metadata: Metadata = {
  title: "Jestin & Anjana Wedding",
  description: "Join us as we celebrate our love and begin our journey together as husband and wife.",
  generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dancingScript.variable}`}>
      <body className={playfair.className} suppressHydrationWarning={true}>
        {/* 2. Wrap the children with the ClientWrapper */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}