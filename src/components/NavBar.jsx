import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [userInfo, setUserInfo] = useState(userDetails?.user?.firstName || ""); // Safe check using optional chaining
  const [showBox, setShowBox] = useState(false);
  const navigate = useNavigate();

  const LogOut = () => {
    localStorage.clear();
    setUserInfo("");
    navigate("/");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUserInfo(localStorage.getItem("userInfo"));
    };

    window.addEventListener("storageUpdate", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storageUpdate", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const getName = (name) => {
    if (!name) return "";
    const nameArray = name.split(" ");
    return nameArray.map((word) => word[0].toUpperCase()).join("");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-20 flex justify-between items-center px-4 py-4 border-gray-300">
      <NavLink
        to="/"
        className="text-3xl font-bold hover:text-indigo-200 transition-colors duration-300"
      >
        ShowRoom <span className="text-yellow-300">.</span>
      </NavLink>

      {/* Navigation links with adjusted font size */}
      <ul className="hidden md:flex items-center gap-12 font-medium">
        <NavLink
          to="/"
          className="py-1 px-3 text-lg hover:bg-indigo-600 transition-all duration-300" // Adjusted font size for Home
          activeClassName="bg-indigo-600 text-white font-bold"
        >
          Home
        </NavLink>
        <NavLink
          to="/cars"
          className="py-1 px-3 text-lg hover:bg-indigo-600 transition-all duration-300" // Adjusted font size for All Cars
          activeClassName="bg-indigo-600 text-white font-bold"
        >
          All Cars
        </NavLink>
        <NavLink
          to="/about"
          className="py-1 px-3 text-lg hover:bg-indigo-600 transition-all duration-300" // Adjusted font size for About
          activeClassName="bg-indigo-600 text-white font-bold"
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className="py-1 px-3 text-lg hover:bg-indigo-600 transition-all duration-300" // Adjusted font size for Contact
          activeClassName="bg-indigo-600 text-white font-bold"
        >
          Contact
        </NavLink>
      </ul>

      {/* User profile or login */}
      {userInfo ? (
        <div
          className="relative flex items-center gap-3 cursor-pointer"
          onClick={() => setShowBox(!showBox)}
        >
          <div className="w-10 h-10 bg-yellow-400 text-white rounded-full flex justify-center items-center text-lg font-semibold hover:scale-110 transition-transform duration-300">
            {getName(userInfo)} {/* Display initials */}
          </div>
          {showBox && (
            <div className="absolute top-16 right-0 mt-2 w-48 bg-white shadow-xl rounded-lg py-2 border-2 border-gray-200 z-50 transition-all duration-300">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => navigate("/myProfile")}
              >
                My Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => LogOut()}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-3">
          <NavLink to="/login">
            <button className="hidden md:block rounded-full bg-primary px-6 py-3 text-white font-bold hover:scale-105 transition-transform duration-300">
              Login
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavBar;
