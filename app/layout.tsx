// app/layout.tsx

import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script } from "next/font/google";
import ClientWrapper from "@/components/ClientWrapper";
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

// --- UPDATED METADATA OBJECT ---
export const metadata: Metadata = {
  // Add metadataBase to ensure absolute URLs are generated correctly
  metadataBase: new URL("https://your-wedding-domain.com"), // <-- IMPORTANT: Replace with your actual domain

  title: "Jestin & Anjana Wedding",
  description: "Join us as we celebrate our love and begin our journey together as husband and wife.",
  
  // This will generate all the <link> tags for your favicons
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  
  // This will generate your manifest link
  manifest: "/favicon/site.webmanifest",

  // This will generate all the og:* tags
  openGraph: {
    title: "Jestin & Anjana Wedding",
    description: "Join us as we celebrate our love and begin our journey together as husband and wife.",
    images: [
      {
        url: "/ogImage.jpg", // The path from the `public` folder
        width: 640,
        height: 640,
        type: "image/jpeg", // Note: The file type is jpeg, not jpg
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The <html> and <body> are now much cleaner
    <html lang="en" className={`${playfair.variable} ${dancingScript.variable}`}>
      <body className={playfair.className} suppressHydrationWarning={true}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}