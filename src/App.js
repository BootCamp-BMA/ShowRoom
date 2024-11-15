import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";
import Contact from "./pages/Contact";
import CarDetails from "./components/CarDetails";
import NavBar from "./components/NavBar";
import Admin from "./Admin/Admin";

const App = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === "/admin";
  return (
    <>
      <div className='mx-3 sm:mx-[5%]'>
        {hideNavBar ? (
          ""
        ) : (
          <div className='mx-1 sm:mx-[3%]'>
            <NavBar />
          </div>
        )}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/myProfile' element={<MyProfile />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/Cars/:CarId' element={<CarDetails />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
