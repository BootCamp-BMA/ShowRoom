import React, { useContext } from "react";
import { Appcontext } from "../contexts/AppContext";
import CarCard from "../components/CarCard"; // Import the CarCard component

const Cars = () => {
  const { cars } = useContext(Appcontext);

  if (!cars  ) {
    return <div>..loading cars</div>; // Handle empty state
  }
  if (cars.length === 0) {
    return <div>No Car Found</div>;
  }
  return (
    <div className="grid grid-cols-auto gap-10 mt-10">
      {cars.map((car) => (
        <CarCard key={car._id} car={car} /> // Render each car using the CarCard component
      ))}
    </div>
  );
};

export default Cars;
