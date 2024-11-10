import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
const NavBar = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-between items-center text-sm py-4 mb-4 border-b border-b-gray-400">
      <NavLink to="/">
        <p className='cursor-pointer'>ShowRoom <span className='text-slate-900 '>.</span></p>
      </NavLink>
      <ul className='hidden md:flex items-start gap-16 font-semibold'>
        <NavLink to="/" >
          <li className='py-1 '>Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className='py-1' >All Cars</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className='py-1'  >ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className='py-1'>CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <NavLink to='/login'>
        <button className='hidden md:block rounded-full bg-primary px-6 py-3 text-white font-bold '>Login</button>
      </NavLink>
    </div>
  )
}

export default NavBar