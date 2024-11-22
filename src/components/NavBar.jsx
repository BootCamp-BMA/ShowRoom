import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [userInfo, setUserInfo] = useState(userDetails?.user?.firstName || ""); // Safe check using optional chaining
  const [showBox, setShowBox] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const LogOut = () => {
    localStorage.clear();
    setUserInfo("");
    navigate("/");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUserInfo(localStorage.getItem("userInfo"));
    };

    // Listen for both the custom "storageUpdate" event and the "storage" event
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

  const isHomePage = location.pathname === "/"; // Check if the current page is the Home page

  return (
    <div className="absolute top-0 left-0 w-full bg-transparent text-white z-20">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <NavLink to="/">
          <p className="text-2xl font-bold text-gray-800 cursor-pointer">
            BoxCars <span className="text-primary">.</span>
          </p>
        </NavLink>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-10 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary underline decoration-primary decoration-2"
                : isHomePage
                ? "text-white hover:text-primary transition"
                : "text-gray-700 hover:text-primary transition"
            }
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/cars" // Updated path
            className={({ isActive }) =>
              isActive
                ? "text-primary underline decoration-primary decoration-2"
                : isHomePage
                ? "text-white hover:text-primary transition"
                : "text-gray-700 hover:text-primary transition"
            }
          >
            <li>All Cars</li>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-primary underline decoration-primary decoration-2"
                : isHomePage
                ? "text-white hover:text-primary transition"
                : "text-gray-700 hover:text-primary transition"
            }
          >
            <li>About</li>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-primary underline decoration-primary decoration-2"
                : isHomePage
                ? "text-white hover:text-primary transition"
                : "text-gray-700 hover:text-primary transition"
            }
          >
            <li>Contact</li>
          </NavLink>
        </ul>

        {/* User Section */}
        {userInfo ? (
          <div
            className="relative flex items-center gap-4 cursor-pointer"
            onClick={() => setShowBox(!showBox)}
          >
            <div className="w-10 h-10 bg-primary text-white rounded-full flex justify-center items-center font-bold">
              {getName(userInfo)} {/* Display initials */}
            </div>
            {showBox && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md py-2 w-48 border">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => navigate("/myProfile")}
                >
                  My Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={LogOut}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <NavLink to="/login">
              <button className="px-6 py-2 bg-primary text-white rounded-full shadow-md font-bold transition transform hover:scale-105 focus:scale-110 focus:outline-none">
                Login
              </button>
            </NavLink>
            <NavLink to="/admin" target="_blank">
              <button className="px-6 py-2 bg-primary text-white rounded-full shadow-md font-bold transition transform hover:scale-105 focus:scale-110 focus:outline-none">
                Admin Panel
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
