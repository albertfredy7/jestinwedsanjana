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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dancingScript.variable}`}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="favicon/site.webmanifest" />
        <meta property="og:image" content="/ogImage.jpg" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="640" />
      </head>
      <body className={playfair.className} suppressHydrationWarning={true}>
        {/* 2. Wrap the children with the ClientWrapper */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}