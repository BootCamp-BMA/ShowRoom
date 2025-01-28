import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CarList = () => {
  const [cars, setCars] = useState([]); // Store car data
  const [loading, setLoading] = useState(true); // Track loading state
  const [deletingCarId, setDeletingCarId] = useState(null); // Track the car being deleted
  const navigate = useNavigate();

  // Fetch cars data from API
  const fetchCars = async () => {
    const apiUrl =
      "https://show-room-server-979c93442bc5.herokuapp.com/api/cars/getWhere";

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include auth token
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching cars: ${response.statusText}`);
      }

      const carData = await response.json();
      setCars(carData); // Update state with fetched cars
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
    }
  };

  // Update the car's availability
  const updateCarAvailability = async (id, isAvailable) => {
    const updateUrl = `https://show-room-server-979c93442bc5.herokuapp.com/api/cars/update/${id}`;

    const requestBody = {
      isAvailable, // Update the isAvailable field
    };

    try {
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error updating car: ${response.statusText}`);
      }

      // Update the local state to reflect the change
      const updatedCars = cars.map((car) =>
        car._id === id ? { ...car, isAvailable } : car
      );
      setCars(updatedCars); // Directly update state without reloading the page
    } catch (error) {
      console.error("Error updating car availability:", error);
    }
  };

  // Delete car by ID
  const deleteCar = async (id) => {
    const deleteUrl = 'https://show-room-server-979c93442bc5.herokuapp.com/api/cars/deleteIds';
    setDeletingCarId(id); // Set the car being deleted

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Corrected typo here
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          id: id, // Send the car ID to delete
        }),
      });

      if (!response.ok) {
        throw new Error(`Error deleting car: ${response.statusText}`);
      }

      // Remove the deleted car from the state
      setCars((prevCars) => prevCars.filter((car) => car._id !== id));
      alert("Car deleted successfully!"); // Success message
    } catch (error) {
      console.error("Error deleting car:", error);
    } finally {
      setDeletingCarId(null); // Reset the deleting state after operation
    }
  };

  useEffect(() => {
    fetchCars(); // Fetch cars when the component mounts
  }, []);

  return (
    <div className="p-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading cars...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden relative"
            >
              {/* Delete Icon in Top-Right Corner */}
              <button
                onClick={() => deleteCar(car._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                {deletingCarId === car._id ? (
                  // Tailwind loader (circular spinner)
                  <div className="w-5 h-5 border-4 border-t-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                ) : (
                  <FaTrash size={18} />
                )}
              </button>

              <div className="p-4">
                <h2 className="text-lg font-bold mb-2 text-gray-800">
                  {car.make} {car.model}
                </h2>
                <div className="flex items-center">
                  <label className="text-sm font-medium mr-2">Available:</label>
                  <input
                    type="checkbox"
                    checked={car.isAvailable}
                    onChange={(e) =>
                      updateCarAvailability(car._id, e.target.checked)
                    }
                    className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-400"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
