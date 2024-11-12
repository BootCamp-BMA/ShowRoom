// NavBar.js
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [userInfo, setUserInfo] = useState(localStorage.getItem("userInfo"));
  const navigate = useNavigate()
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
    <div className='flex justify-between items-center text-sm py-4 mb-4 border-b border-b-gray-400'>
      <NavLink to='/'>
        <p className='cursor-pointer'>
          ShowRoom <span className='text-slate-900'>.</span>
        </p>
      </NavLink>
      <ul className='hidden md:flex items-start gap-16 font-semibold'>
        <NavLink to='/'>
          <li className='py-1'>Home</li>
        </NavLink>
        <NavLink to='/doctors'>
          <li className='py-1'>All Cars</li>
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>About</li>
        </NavLink>
        <NavLink to='/contact'>
          <li className='py-1'>Contact</li>
        </NavLink>
      </ul>
      {userInfo ? (
        <div className='flex items-center gap-2 cursor-pointer' onClick={()=>{navigate('./myProfile')}}>
          <div className='w-8 h-8 bg-primary text-white rounded-full flex justify-center items-center'>
            {getName(userInfo)} {/* Display the initials of the user's name */}
          </div>
        </div>
      ) : (
        <NavLink to='/login'>
          <button className='hidden md:block rounded-full bg-primary px-6 py-3 text-white font-bold'>
            Login
          </button>
        </NavLink>
      )}
    </div>
  );
};

export default NavBar;
