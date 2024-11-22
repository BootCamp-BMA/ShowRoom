import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGasPump, FaBatteryFull, FaCogs, FaCar } from "react-icons/fa"; // Import icons from Font Awesome

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  return (
    <div className="cursor-pointer rounded-2xl border-primary border-solid border p-4 bg-white shadow-lg hover:shadow-2xl transition-all">
      {/* Card Header */}
      <CardHeader car={car} navigate={navigate} />

      {/* Card Body */}
      <CardBody car={car} />
    </div>
  );
};

const CardHeader = ({ car, navigate }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold">{car.price}</h2>
    <button
      onClick={() => navigate(`/Cars/${car.id}`)}
      className="text-primary font-semibold px-4 py-2 rounded-full border border-primary hover:bg-primary hover:text-white transition-all"
    >
      View Details
    </button>
  </div>
);

const CardBody = ({ car }) => (
  <div>
    <CarImage image={car.image} />
    <CarDetails car={car} />
    <button
      className="w-full bg-primary px-6 py-3 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out"
      onClick={() => alert("Booking feature coming soon!")}
    >
      <FaCar className="inline mr-2" /> Book Now
    </button>
  </div>
);

const CarImage = ({ image }) => (
  <img src={image} alt="Car" className="w-full rounded-lg mb-4" />
);

const CarDetails = ({ car }) => (
  <div className="text-sm text-gray-600 mb-4">
    <p className="flex items-center mb-2">
      <FaCar className="text-primary mr-2" />
      <strong>Model:</strong> {car.model}
    </p>
    <p className="flex items-center mb-2">
      <FaGasPump className="text-primary mr-2" />
      <strong>Fuel Type:</strong> {car.fuelType}
    </p>
    <p className="flex items-center mb-2">
      <FaCogs className="text-primary mr-2" />
      <strong>Transmission:</strong> {car.transmission}
    </p>
    <p className="flex items-center mb-2">
      <strong>Mileage:</strong> {car.mileage} km
    </p>
  </div>
);

export default CarCard;
