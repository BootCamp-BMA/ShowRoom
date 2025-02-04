import React, { useContext } from "react";
import { Appcontext } from "../contexts/AppContext";
import CarCard from "../components/CarCard"; // Import the CarCard component
import img from "../assets/images/pexels-lloyd-freeman-599375-1429775.jpg";
import model from "../modelCar/web3d.glb";

const Cars = () => {
  const {cars } = useContext(Appcontext)

  if (!cars || cars.length === 0) {
    return <div className="text-center text-lg">..loading cars</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-4">
      {cars.map((car) => (
        <CarCard key={car._id} car={car} />
      ))}
    </div>
  );
};

export default Cars;
