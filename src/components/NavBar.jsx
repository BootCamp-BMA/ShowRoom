import React, { useState, useEffect } from "react";

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, ArrowLeft } from "lucide-react";


const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
  const [userInfo, setUserInfo] = useState(userDetails?.user?.firstName || "");
  const [showBox, setShowBox] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container") && menuOpen) {
        setMenuOpen(false);
      }
      if (!event.target.closest(".profile-box") && showBox) {
        setShowBox(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen, showBox]);


  const LogOut = () => {
    localStorage.clear();
    setUserInfo("");
    navigate("/");
  };

  const getName = (name) => {
    return name ? name.split(" ").map((word) => word[0].toUpperCase()).join("") : "";
  };


  const isSpecialPage = ["/contact", "/about", "/cars"].includes(location.pathname);

  if (location.pathname === "/login") {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-black py-4 px-6 flex justify-between items-center text-white">
        <button onClick={() => navigate("/")} className="text-white flex items-center gap-2">
          <ArrowLeft size={24} />
          <span>Go Back</span>
        </button>
        <NavLink to="/" className="text-3xl font-bold tracking-wide absolute left-1/2 transform -translate-x-1/2 text-white hover:text-gray-300">
          REVORA
        </NavLink>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 py-4 px-6 flex justify-between items-center text-white ${isSpecialPage ? "bg-black" : "bg-black bg-opacity-90"}`}> 
      {/* Left side - Menu */}
      <button className="flex items-center gap-2 text-lg font-semibold text-white hover:text-gray-300 menu-container" onClick={() => setMenuOpen(!menuOpen)}>
        <Menu size={35} />

        <span>Menu</span>
      </button>

      {/* Center - Logo */}

      <NavLink to="/" className="text-3xl font-bold tracking-wide absolute left-1/2 transform -translate-x-1/2 text-white hover:text-gray-300">

        REVORA
      </NavLink>

      {/* Right side - Profile or Login Button */}
      {!isSpecialPage && userInfo ? (
        <div className="relative flex items-center cursor-pointer profile-box" onClick={() => setShowBox(!showBox)}>
          <div className="w-10 h-10 bg-gray-800 text-white rounded-full flex justify-center items-center text-lg font-semibold hover:scale-110 transition-transform">

            {getName(userInfo)}
          </div>
          {showBox && (
            <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-lg py-2 text-black">

              <button className="block w-full px-4 py-2 hover:bg-gray-100" onClick={() => navigate("/myProfile")}>My Profile</button>
              <button className="block w-full px-4 py-2 hover:bg-gray-100" onClick={() => navigate("/myApointement")}>My Appointments</button>
              <button className="block w-full px-4 py-2 hover:bg-gray-100" onClick={LogOut}>Logout</button>

            </div>
          )}
        </div>
      ) : (

        !isSpecialPage && (
          <NavLink to="/login">
            <button className="flex items-center gap-2 rounded-full bg-transparent px-6 py-3 text-white font-bold hover:bg-gray-700 hover:scale-105 transition-all duration-300">
              <User size={24} />
              <span>Login</span>
            </button>
          </NavLink>
        )
      )}

      {/* Sliding Menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-black text-white transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button className="absolute top-6 right-6 text-white hover:text-gray-300" onClick={() => setMenuOpen(false)}>
          <X size={28} />
        </button>
        <ul className="flex flex-col items-start pt-20 pl-6 space-y-6 text-lg font-medium">
          <NavLink to="/" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/cars" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>All Cars</NavLink>
          <NavLink to="/about" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Contact</NavLink>

        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
