import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Appcontext } from "../contexts/AppContext";

const CarDetails = () => {
  const { cars } = useContext(Appcontext);
  const { CarId } = useParams();
  const [loading, setLoading] = useState(false);
  const carDetails = cars.find((e) => e.id === CarId);

  const [appointmentData, setAppointmentData] = useState({
    appointmentDate: "", // Only date is required
    duration: "",
    notes: "",
  });

  const [errorMessage, setErrorMessage] = useState("");  // To show error message for invalid date

  const token = localStorage.getItem("authToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { appointmentDate, duration, notes } = appointmentData;

    // Convert the date to ISO 8601 with default time (12:00:00)
    const appointmentDateTime = new Date(appointmentDate + "T12:00:00Z");

    // Validate if the selected date is in the future
    if (appointmentDateTime <= new Date()) {
      setErrorMessage("Appointment date and time must be in the future.");
      return;
    } else {
      setErrorMessage('')
    }

    const payload = {
      price: carDetails.price,
      carId: CarId,
      appointmentDateTime: appointmentDateTime.toISOString(),
      duration: parseInt(duration),
      notes,
      userId: JSON.parse(localStorage.getItem("userDetails")).user._id,
    };

    setLoading(true);
    try {
      const response = await fetch("https://show-room-server-979c93442bc5.herokuapp.com/api/appointement/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error(errorData.message || "Failed to create appointment");
      }

      alert("Appointment successfully created!");
      setLoading(false);
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Error creating appointment: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-6">
        {carDetails ? (
          <>
            <h1 className="text-3xl font-bold">{carDetails.name}</h1>
            <p className="text-gray-600">Model: {carDetails.model}</p>
            <img src={carDetails.image} alt={carDetails.name} className="w-64 h-64 object-cover mt-4" />
          </>
        ) : (
          <p>Car not found</p>
        )}
      </div>

      <div className="p-6 mt-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Make an Appointment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700">Date:</label>
            <input
              type="date"
              name="appointmentDate"
              value={appointmentData.appointmentDate}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <div>
            <label className="block text-gray-700">Duration (in days):</label>
            <input
              type="number"
              name="duration"
              value={appointmentData.duration}
              onChange={handleChange}
              required
              min="1"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Notes:</label>
            <textarea
              name="notes"
              value={appointmentData.notes}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            {loading ? "..loading" : "Submit Appointment"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CarDetails;
