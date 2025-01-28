import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CarList = () => {
  const [cars, setCars] = useState([]); // Store car data
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate()
  const fetchCars = async () => {
    const apiUrl =
      "https://show-room-server-979c93442bc5.herokuapp.com/api/cars/getWhere";

    const requestBody = {
      condition: {}, // Fetch all cars, no specific condition
      select: "make model isAvailable ", // Only fetch required fields
    };

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Update with your auth token
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching cars: ${response.statusText}`);
      }

      const carData = await response.json();
      setCars(carData); // Update state with the fetched cars
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
    }
  };

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
      window.location.reload()
      navigate("")
    } catch (error) {
      console.error("Error updating car availability:", error);
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
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2 text-gray-800">
                  {car.make} {car.model}
                </h2>
                <div className="flex items-center">
                  <label className="text-sm font-medium mr-2">
                    Available:
                  </label>
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
