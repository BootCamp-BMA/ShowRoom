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
import Footer from "./components/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SignUp from "./pages/SignUp";
import MyApointement from "./pages/MyApointement";

const App = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === "/admin";
  const hideFooter = location.pathname === "/admin"; // Hide Footer on admin page

  return (
    <>
      <div className="">
        {hideNavBar ? (
          ""
        ) : (
          <div className="mx-1 sm:mx-[3%]">
            <NavBar />
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/myApointement" element={<MyApointement/>} />
          <Route path="/Cars/:CarId" element={<CarDetails />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        {/* Add Footer here */}
        {hideFooter ? "" : <Footer />}
      </div>
      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default App;
