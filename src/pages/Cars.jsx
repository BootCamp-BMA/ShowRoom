import React, { useContext } from "react";
import { Appcontext } from "../contexts/AppContext";
import CarCard from "../components/CarCard"; // Import the CarCard component

const Cars = () => {
  const { cars } = useContext(Appcontext);

  return (
    <div className="grid grid-cols-auto gap-10 mt-10">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} /> // Render each car using the CarCard component
      ))}
    </div>
  );
};

export default Cars;
