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
import AllCars from "./pages/AllCars"; // Import the AllCars component

const App = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === "/admin";
  const hideFooter = location.pathname === "/admin"; // Hide Footer on admin page

  return (
    <>
      <div className="w-screen h-screen">
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/cars" element={<AllCars />} /> {/* Add this route */}
          <Route path="/Cars/:CarId" element={<CarDetails />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        {/* Add Footer here */}
        {hideFooter ? "" : <Footer />}
      </div>
    </>
  );
};

export default App;
