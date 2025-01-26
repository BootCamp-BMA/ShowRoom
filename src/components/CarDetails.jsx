import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Appcontext } from "../contexts/AppContext";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

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
  const [modelUrl, setModelUrl] = useState(null);

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

  useEffect(() => {
    if (carDetails && carDetails.model3D) {
      setModelUrl(carDetails.model3D);
    } else {
      setModelUrl("/fallback-model.glb");
    }
  }, [carDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-6 m-10">
        {carDetails ? (
          <>
            <h1 className="text-5xl font-bold text-center mb-4">{carDetails.make}</h1>
            <p className="text-3xl text-gray-600 text-center">{carDetails.model}</p>
            <div className="mt-8 flex justify-center">
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

      <div className="p-6 mt-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Make an Appointment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormInput
            label="Date"
            id="appointmentDate"
            name="appointmentDate"
            type="date"
            value={appointmentData.appointmentDate}
            onChange={handleChange}
            required={true}
          />
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <FormInput
            label="Duration (in days)"
            id="duration"
            name="duration"
            type="number"
            value={appointmentData.duration}
            onChange={handleChange}
            required={true}
            min="1"
          />
          <div>
            <label
              htmlFor="notes"
              className="block text-gray-700 font-medium mb-1"
            >
              Notes:
            </label>
            <textarea
              id="notes"
              name="notes"
              value={appointmentData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-200 p-2"
              placeholder="Add any relevant notes (optional)"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 transition duration-200"
            }`}
          >
            {loading ? "Submitting..." : "Submit Appointment"}
          </button>
        </form>
      </div>
    </>
  );
};

const FormInput = ({ label, id, name, type, value, onChange, required, min }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
        {label}:
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-200 p-2"
      />
    </div>
  );
};

function RotatingObject({ scene }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return <primitive object={scene} ref={meshRef} />;
}

const ModelViewer = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl, true);

  return (
    <div
      style={{ position: "relative", height: "400px", width: "80%" }}
      className="border-black p-4 bg-blue-500 rounded-md text-center flex justify-center items-center"
    >
      <Canvas>
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <RotatingObject scene={scene} />
      </Canvas>
    </div>
  );
};

export default CarDetails;