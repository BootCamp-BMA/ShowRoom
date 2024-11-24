// NavBar.js
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

  return (
    <div className="flex justify-between items-center text-sm py-4 mb-4 border-b border-b-gray-400">
      <NavLink to="/">
        <p className="cursor-pointer">
          ShowRoom <span className="text-slate-900">.</span>
        </p>
      </NavLink>
      <ul className="hidden md:flex items-start gap-16 font-semibold">
        <NavLink to="/">
          <li className="py-1">Home</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Cars</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
        </NavLink>
      </ul>
      {userInfo ? (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setShowBox(!showBox);
          }}
        >
          <div className="cursor-pointer w-8 h-8 bg-primary text-white rounded-full flex justify-center items-center">
            {getName(userInfo)} {/* Display the initials of the user's name */}
          </div>
          {showBox ? (
            <div className=" absolute top-16 right-5 mt-2 w-40 bg-white shadow-lg rounded-lg py-2rounded bg-white flex flex-col gap-3 border-2 border-black border-solid z-50">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => navigate("/myProfile")}
              >
                MyProfile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => LogOut()}
              >
                Logout
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="flex gap-3">
          <NavLink to="/login">
            <button className="hidden md:block rounded-full bg-primary px-6 py-3 text-white font-bold">
              Login
            </button>
          </NavLink>
          {/* <NavLink to='/login' target='_blank'>
            <button className='hidden md:block rounded-full bg-primary px-6 py-3 text-white font-bold'>
              Admin Panel
            </button>
          </NavLink> */}
        </div>
      )}
    </div>
  );
};

export default NavBar;