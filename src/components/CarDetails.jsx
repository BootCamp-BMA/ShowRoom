import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Appcontext } from "../contexts/AppContext";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { use } from "react";

const CarDetails = () => {
  const { cars } = useContext(Appcontext);
  const [loading, setLoading] = useState(false);
  const { CarId } = useParams();
  const [appointmentData, setAppointmentData] = useState({
    appointmentDate: "",
    duration: "",
    notes: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [modelUrl, setModelUrl] = useState(null); // State to hold the model URL

  const token = localStorage.getItem("authToken");

  const carDetails = cars.find((car) => car._id === CarId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { appointmentDate, duration, notes } = appointmentData;
    const appointmentDateTime = new Date(appointmentDate + "T12:00:00Z");

    if (appointmentDateTime <= new Date()) {
      setErrorMessage("Appointment date must be in the future.");
      return;
    }

    const payload = {
      price: carDetails.pricePerDay,
      carId: CarId,
      appointmentDateTime: appointmentDateTime.toISOString(),
      duration: parseInt(duration),
      notes,
      userId: JSON.parse(localStorage.getItem("userDetails"))?.user._id,
    };

    setErrorMessage("");
    setLoading(true);
    try {
      const response = await fetch(
        "https://show-room-server-979c93442bc5.herokuapp.com/api/appointement/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
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

  // Effect to fetch the model URL after car details are loaded
  useEffect(() => {
    if (carDetails && carDetails.model3D) {
      setModelUrl(carDetails.model3D); // Set the model URL if available
    } else {
      setModelUrl("/fallback-model.glb"); // Use fallback model if not available
    }
  }, [carDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-6">
        {carDetails ? (
          <>
            <h1 className="text-3xl font-bold">{carDetails.name}</h1>
            <p className="text-gray-600">Model: {carDetails.model}</p>
            <div className="mt-4">
              {modelUrl ? (
                <ModelViewer modelUrl={modelUrl} />
              ) : (
                <p>No 3D model available</p>
              )}
            </div>
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
            {
              loading ? "...loading" : "Submit Appointment"
            }
          </button>
        </form>
      </div>
    </>
  );
};

const ModelViewer = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl, true); // Load the 3D model

  return (
    <Canvas style={{ height: "500px", width: "100%" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={true} />
      <primitive object={scene} scale={0.5} />
    </Canvas>
  );
};

export default CarDetails;
