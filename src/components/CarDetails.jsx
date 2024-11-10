import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Appcontext } from "../contexts/AppContext";

const CarDetails = () => {
  const { cars } = useContext(Appcontext);
  const { CarId } = useParams();  // Use `CarId` to match route parameter name

  // Convert `CarId` to a number if your car IDs are numbers
  const carDetails = cars.find((e) => e.id === CarId);

  return (
    <div>
      {carDetails ? (
        <>
          <h1>{carDetails.name}</h1>
          <p>Model: {carDetails.model}</p>
          <img src={carDetails.image} alt={carDetails.name} />
          {/* Add more car details as needed */}
        </>
      ) : (
        <p>Car not found</p>
      )}
    </div>
  );
};

export default CarDetails;
