import React, { useState } from "react";
import Dashboard from "./Dashboard";
import AddProduct from "./AddProduct";
import CartList from "./CartList";
import Apointement from "./Apointement";

const Admin = () => {
  const [selectedCategory, setSelectedCategory] = useState("Dashoboard");

  const categories = [
    { name: "Dashoboard", component: <Dashboard /> },
    { name: "AddProduct", component: <AddProduct /> },
    { name: "CarList", component: <CartList /> },
    { name: "Appointement", component: <Apointement /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 mt-5">
      {/* Sidebar */}
      <div className="w-48 bg-white shadow-md flex flex-col p-4">
        <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
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
      <div className="flex-1 p-6">
        {selectedCategory && (
          <div className="bg-white shadow-md rounded-lg p-6">
            {categories.find((cat) => cat.name === selectedCategory)?.component}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
