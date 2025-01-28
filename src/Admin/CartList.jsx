import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CarList = () => {
  const [cars, setCars] = useState([]); // Store car data
  const [loading, setLoading] = useState(true); // Track loading state
  const [deletingCarId, setDeletingCarId] = useState(null); // Track the car currently being deleted
  const navigate = useNavigate();

  const fetchCars = async () => {
    const apiUrl =
      "https://show-room-server-979c93442bc5.herokuapp.com/api/cars/getWhere";

    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching cars: ${response.statusText}`);
      }

      const carData = await response.json();
      setCars(carData); // Update state with the fetched cars
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCarAvailability = async (id, isAvailable) => {
    const updateUrl = `https://show-room-server-979c93442bc5.herokuapp.com/api/cars/update/${id}`;

    const requestBody = {
      isAvailable,
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

      window.location.reload();
      navigate("");
    } catch (error) {
      console.error("Error updating car availability:", error);
    }
  };

  const deleteCar = async (id) => {
    const deleteUrl =
      "https://show-room-server-979c93442bc5.herokuapp.com/api/cars/deleteIds";
    setDeletingCarId(id); // Set the car being deleted

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          id: id, // Send the car ID to delete
        }),
      });

      if (!response.ok) {
        console.error("Response not OK", response);
        throw new Error(`Error deleting car: ${response.statusText}`);
      }

      setCars((prevCars) => prevCars.filter((car) => car._id !== id));
      alert("Car deleted successfully!"); // Success message
    } catch (error) {
      console.error("Error deleting car:", error.message);
      alert(`Failed to delete car: ${error.message}`);
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
              {/* Show spinner and hide delete button if this car is being deleted */}
              {deletingCarId === car._id ? (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-200 bg-opacity-50">
                  <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                </div>
              ) : (
                <button
                  onClick={() => deleteCar(car._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash size={18} />
                </button>
              )}

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
