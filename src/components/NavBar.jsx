import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

const NavBar = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [userInfo, setUserInfo] = useState(userDetails?.user?.firstName || "");
  const [showBox, setShowBox] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const LogOut = () => {
    localStorage.clear();
    setUserInfo("");
    navigate("/");
  };

  const getName = (name) => {
    if (!name) return "";
    return name.split(" ").map((word) => word[0].toUpperCase()).join("");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md py-4 px-6 flex justify-between items-center text-white transition-all duration-300">
      {/* Left side - Menu */}
      <button className="flex items-center gap-2 text-lg font-semibold" onClick={() => setMenuOpen(!menuOpen)}>
        <Menu size={28} />
        <span>Menu</span>
      </button>

      {/* Center - Logo */}
      <NavLink to="/" className="text-3xl font-bold tracking-wide absolute left-1/2 transform -translate-x-1/2">
        REVORA
      </NavLink>
      <NavLink to="/login" className="bg-white p-4 text-black ml-6 text-3xl font-bold tracking-wide absolute left-1/2 transform -translate-x-1/2">
        login
      </NavLink>

      {/* Right side - Profile or Login Button */}
      {userInfo ? (
        <div className="relative flex items-center cursor-pointer" onClick={() => setShowBox(!showBox)}>
          <div className="w-10 h-10 bg-gray-800 text-white rounded-full flex justify-center items-center text-lg font-semibold hover:scale-110 transition-transform">
            {getName(userInfo)}
          </div>
          {showBox && (
            <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-lg py-2 text-black">
              <button className="block w-full px-4 py-2 hover:bg-gray-100" onClick={() => navigate("/myProfile")}>
                My Profile
              </button>
              <button className="block w-full px-4 py-2 hover:bg-gray-100" onClick={() => navigate("/myApointement")}>
                My Appointments
              </button>
              <button className="block w-full px-4 py-2 hover:bg-gray-100" onClick={LogOut}>
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <NavLink to="/login">
          <button className="flex items-center gap-2 rounded-full bg-transparent px-6 py-3 text-white font-bold hover:bg-gray-700 hover:scale-105 transition-all duration-300">
            <User size={24} />
            <span>Login</span>
          </button>
        </NavLink>
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button className="absolute top-6 right-6" onClick={() => setMenuOpen(false)}>
          <X size={28} />
        </button>
        <ul className="flex flex-col items-start pt-20 pl-6 space-y-6 text-lg font-medium">
          <NavLink to="/" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/cars" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
            All Cars
          </NavLink>
          <NavLink to="/about" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
          <NavLink to="/contact" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
