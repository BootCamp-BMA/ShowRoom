import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGasPump, FaCogs, FaCar } from "react-icons/fa"; // Import icons from Font Awesome

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer rounded-2xl border border-gray-300 bg-white shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300"
    >
      {/* Card Header */}
      <CardHeader car={car} navigate={navigate} />

      {/* Card Body */}
      <CardBody car={car} />
    </div>
  );
};

const CardHeader = ({ car, navigate }) => (
  <div className="relative">
    <CarImage images={car.imageUrls} />
    <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg">
      <h2 className="text-2xl font-semibold text-primary">{car.pricePerDay} / day</h2>
    </div>
    <button
      onClick={() => navigate(`/Cars/${car._id}`)}
      className="absolute top-4 right-4 text-white bg-primary font-semibold px-6 py-3 rounded-full border-2 border-primary hover:bg-white hover:text-primary transition-all"
    >
      View Details
    </button>
  </div>
);

const CardBody = ({ car }) => (
  <div className="px-6 py-4">
    <CarDetails car={car} />
    <button
      className="w-full bg-primary px-6 py-3 text-white font-bold rounded-lg hover:scale-110 transition-all duration-300 ease-in-out"
      onClick={() => alert("Booking feature coming soon!")}
    >
      <FaCar className="inline mr-2" /> Book Now
    </button>
  </div>
);

const CarImage = ({ images }) => (
  <div className="relative">
    {images && images.length > 0 ? (
      <img
        src={images[0]}
        alt="Car"
        className="w-full h-72 object-cover rounded-t-2xl transition-all duration-500 hover:scale-105"
      />
    ) : (
      <div className="w-full h-72 bg-gray-300 flex items-center justify-center rounded-t-2xl">
        <span>No Image Available</span>
      </div>
    )}
  </div>
);

const CarDetails = ({ car }) => (
  <div className="text-sm text-gray-700 mb-4">
    <p className="flex items-center mb-2">
      <FaCar className="text-primary mr-2" />
      <strong>Model:</strong> {car.model}
    </p>
    <p className="flex items-center mb-2">
      <FaGasPump className="text-primary mr-2" />
      <strong>Make:</strong> {car.make}
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
