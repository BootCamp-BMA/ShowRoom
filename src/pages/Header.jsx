import React, { useMemo } from "react";

const Header = ({ children }) => {
  const carImages = useMemo(
    () => [
      "/carImages/pexels-michalrobak-29380875.jpg", // Only one image for display
    ],
    []
  );

  return (
    <header
      className="relative w-full min-h-screen bg-cover bg-center text-white flex items-center justify-center"
      style={{
        backgroundImage: `url(${carImages[0]})`,
        backgroundSize: "cover", // Ensures the image covers the entire header
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Ensures the image doesn't repeat
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content inside header */}
      <div className="relative z-10 text-center px-4 w-full">{children}</div>
    </header>
  );
};

export default Header;
