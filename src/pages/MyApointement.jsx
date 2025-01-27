import React, { useEffect, useState } from "react";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [cars, setCars] = useState({}); // Use an object to store car data by ID for easier lookup
  const [loading, setLoading] = useState(true); // Loading state for fetching data

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Get user ID from localStorage
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const userId = userDetails?.user?._id;
        const authToken = localStorage.getItem("authToken");

        if (!userId || !authToken) {
          throw new Error("User ID or auth token is missing");
        }

        // Fetch appointments
        const appointmentsResponse = await fetch(
          "https://show-room-server-979c93442bc5.herokuapp.com/api/appointement/getWhere",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!appointmentsResponse.ok) {
          throw new Error(`Failed to fetch appointments: ${appointmentsResponse.statusText}`);
        }

        const appointmentsData = await appointmentsResponse.json();

        // Filter appointments for the logged-in user
        const filteredAppointments = appointmentsData.filter(
          (appointment) => appointment.userId === userId
        );

        setAppointments(filteredAppointments);

        // Fetch car details for each appointment
        const carIds = [...new Set(filteredAppointments.map((appointment) => appointment.carId))];
        const carsData = await Promise.all(
          carIds.map(async (carId) => {
            const carResponse = await fetch(
              `https://show-room-server-979c93442bc5.herokuapp.com/api/cars/getById/${carId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );
            if (!carResponse.ok) {
              throw new Error(`Failed to fetch car: ${carResponse.statusText}`);
            }
            return { carId, data: await carResponse.json() };
          })
        );

        // Store car details by ID for quick lookup
        const carsMap = carsData.reduce((acc, { carId, data }) => {
          acc[carId] = data;
          return acc;
        }, {});

        setCars(carsMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchAppointments();
  }, []);

  // Loading state handling
  if (loading) {
    return <p>Loading appointments...</p>;
  }

  return (
    <div className="my-20 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">My Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appointment, index) => {
          const car = cars[appointment.carId]; // Lookup car details by ID
          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              {car?.image && (
                <div className="mb-4">
                  <img
                    src={car.image}
                    alt={`${car?.make} ${car?.model}`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Car: <span className="text-blue-600">{car?.make} {car?.model}</span>
              </h2>
              <p className="text-gray-600">
                Date & Time:{" "}
                <span className="font-medium">
                  {new Date(appointment.appointmentDateTime).toLocaleString()}
                </span>
              </p>
              <p className="text-gray-600">
                Duration: <span className="font-medium">{appointment.duration} hours</span>
              </p>
              <p className="text-gray-600">
                Price: <span className="font-medium text-green-600">${appointment.price}</span>
              </p>
              <p className="text-gray-600">
                Notes: <span className="font-medium">{appointment.notes || "No notes provided"}</span>
              </p>
              <p className="text-gray-600 mt-4">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    appointment.status === "confirmed"
                      ? "text-green-600"
                      : appointment.status === "pending"
                      ? "text-orange-400"
                      : appointment.status === "canceled"
                      ? "text-red-600"
                      : "text-gray-600" // Default for unknown status
                  }`}
                >
                  {appointment.status || "Unknown"} {/* Fallback text for status */}
                </span>
              </p>
              <div className="mt-4 flex gap-4">
                <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200">
                  Cancel Appointment
                </button>
                {/* Uncomment if needed */}
                {/* <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  Pay Online
                </button> */}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyAppointment;
