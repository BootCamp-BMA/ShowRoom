import React, { useState, useEffect, useMemo } from "react";

const Header = ({ children }) => {
  const carImages = useMemo(
    () => [
      "/Carimages/4143695f19_94562_teslas-p100-d-1.jpg",
      "/Carimages/download.jfif",
    ],
    []
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // Start fade-out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carImages.length);
        setIsFading(false); // Start fade-in
      }, 1000); // Match fade-out duration
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [carImages]);

  return (
    <header
      className={`relative bg-cover bg-center h-[400px] sm:h-[500px] text-white flex items-center justify-center transition-opacity duration-1000 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundImage: `url(${carImages[currentImageIndex]})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center px-4">{children}</div>
    </header>
  );
};

export default Header;
