import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard"; // Adjust the path based on your folder structure

const AllCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Simulate fetching car data (replace with actual API fetch if available)
    const fetchCars = async () => {
      const carData = [
        {
          id: 1,
          model: "Car Model 1",
          price: "$20,000",
          fuelType: "Petrol",
          transmission: "Automatic",
          mileage: 12000,
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 2,
          model: "Car Model 2",
          price: "$25,000",
          fuelType: "Diesel",
          transmission: "Manual",
          mileage: 8000,
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 3,
          model: "Car Model 3",
          price: "$30,000",
          fuelType: "Electric",
          transmission: "Automatic",
          mileage: 5000,
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 4,
          model: "Car Model 4",
          price: "$22,000",
          fuelType: "Petrol",
          transmission: "Manual",
          mileage: 10000,
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 5,
          model: "Car Model 5",
          price: "$27,000",
          fuelType: "Hybrid",
          transmission: "Automatic",
          mileage: 7000,
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 6,
          model: "Car Model 6",
          price: "$35,000",
          fuelType: "Electric",
          transmission: "Automatic",
          mileage: 2000,
          image: "https://via.placeholder.com/300x200",
        },
      ];
      setCars(carData);
    };

    fetchCars();
  }, []);

  return (
    <div className="py-16 px-6 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default AllCars;
