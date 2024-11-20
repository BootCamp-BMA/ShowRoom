import React, { useState , useEffect } from "react";
import Dashboard from "./Dashboard";
import AddProduct from "./AddProduct";
import CartList from "./CartList";
import Apointement from "./Apointement";

import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [selectedCategory, setSelectedCategory] = useState("Dashoboard");
  const navigate = useNavigate();
  // const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  // const [userInfo, setUserInfo] = useState(userDetails?.user?.firstName || "");
  const categories = [
    { name: "Dashoboard", component: <Dashboard /> },
    { name: "AddProduct", component: <AddProduct /> },
    { name: "CarList", component: <CartList /> },
    { name: "Appointement", component: <Apointement /> },
  ];
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const token = userDetails?.token;

    // if (!token || userDetails.user.role === "admin") {
    //   navigate("/login"); // Redirect if no token
    // } 
    if (token ) {
      navigate("/admin"); // Redirect if no token
    } 
    if (token && userDetails.user.role === "user" ) {
      navigate("/"); // Redirect if no token
    } 
  }, [navigate]);
  const LogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className='flex flex-col mt-4 '>
      <div>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-extrabold  mb-4'>Admin Panel</h2>
          <button onClick={()=>{LogOut()}} className="bg-primary cursor-pointer text-white  py-3 px-3  my-2 rounded-md">logout</button>
        </div>
      </div>
      <div className='flex h-screen bg-gray-100 mt-5'>
        {/* Sidebar */}
        <div className='w-48 bg-white shadow-md flex flex-col p-4'>
          {categories.map((element, index) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(element.name)}
              className={`text-black text-sm p-3 rounded-lg cursor-pointer mb-2 hover:bg-gray-300 ${
                selectedCategory === element.name ? "bg-primary text-white" : ""
              }`}
            >
              {element.name}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className='flex-1 p-6'>
          {selectedCategory && (
            <div className='bg-white shadow-md rounded-lg p-6'>
              {
                categories.find((cat) => cat.name === selectedCategory)
                  ?.component
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
