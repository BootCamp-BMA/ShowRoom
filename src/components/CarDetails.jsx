import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Appcontext } from "../contexts/AppContext";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Html,
  useProgress,
} from "@react-three/drei";

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
            <h1 className="text-5xl font-bold text-center mb-4">
              {carDetails.make}
            </h1>
            <p className="text-3xl text-gray-600 text-center">
              {carDetails.model}
            </p>
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

      <div className="p-6 mt-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Book an Appointment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Appointment Date */}
          <div className="relative">
            <label
              htmlFor="appointmentDate"
              className="block text-gray-700 font-medium mb-1"
            >
              Appointment Date:
            </label>
            <div className="flex items-center">
              <input
                id="appointmentDate"
                name="appointmentDate"
                type="date"
                value={appointmentData.appointmentDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 p-2"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          {/* Duration */}
          <div className="relative">
            <label
              htmlFor="duration"
              className="block text-gray-700 font-medium mb-1"
            >
              Duration (in days):
            </label>
            <div className="flex items-center">
              <input
                id="duration"
                name="duration"
                type="number"
                value={appointmentData.duration}
                onChange={handleChange}
                required
                min="1"
                placeholder="Enter number of days"
                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 p-2"
              />
            </div>
          </div>

          {/* Notes */}
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
              placeholder="Add any relevant notes (optional)"
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 p-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-lg font-semibold rounded-md text-white shadow-sm transition duration-300 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Submitting...
              </div>
            ) : (
              "Submit Appointment"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

const FormInput = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  required,
  min,
}) => {
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

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mb-2"></div>
        <p className="text-gray-700 font-semibold">
          Loading... {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}

const ModelViewer = ({ modelUrl }) => {
  const { scene, error } = useGLTF(modelUrl, true);

  if (error) {
    return (
      <div className="p-4 bg-red-100 rounded-md text-center">
        <p className="text-red-500 font-bold">
          Failed to load the 3D model. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{ position: "relative", height: "500px", width: "100%" }}
      className="border border-gray-300 shadow-lg rounded-md bg-gradient-to-r from-blue-100 to-white"
    >
      <Canvas>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls />
        <Environment preset="city" background />
        <React.Suspense fallback={<Loader />}>
          <RotatingObject scene={scene} />
        </React.Suspense>
      </Canvas>
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-md shadow-md px-4 py-2 text-sm text-gray-700">
        <p>🖱️ Drag to rotate</p>
        <p>🔍 Scroll to zoom</p>
      </div>
    </div>
  );
};

export default CarDetails;
