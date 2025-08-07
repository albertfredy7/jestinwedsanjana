// components/ClientWrapper.tsx

"use client"; // This is a Client Component

import { useState, useEffect } from "react";
import SplashScreen from "./splashscreen";


// This component will wrap our page content
export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timer to hide the splash screen after a delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []); // The empty dependency array ensures this runs only once

  // If we are loading, show the splash screen
  if (isLoading) {
    return <SplashScreen/>;
  }

  // Otherwise, show the actual page content
  return <>{children}</>;
}