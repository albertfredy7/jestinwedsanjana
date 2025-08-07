// components/SplashScreen.tsx

import React from "react";

const SplashScreen = () => {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-amber-600
      "
    >
      <h1 className="text-9xl font-bold text-white font-playfair animate-pulse">
        J❤A
      </h1>
    </div>
  );
};

export default SplashScreen;