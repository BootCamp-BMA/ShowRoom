import React, { useEffect, useState } from "react";

const Appointment = () => {
  const [userAppointmentInfo, setUserAppointmentInfo] = useState([]);
  const [carDetails, setCarDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // Fetch all appointments
  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch(
          "https://show-room-server-979c93442bc5.herokuapp.com/api/appointement/getWhere",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching appointments: ${response.statusText}`);
        }

        const info = await response.json();
        setUserAppointmentInfo(info);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }

    fetchAppointments();
  }, []);

  // Fetch user details
  useEffect(() => {
    async function fetchUsers() {
      const url =
        "https://show-room-server-979c93442bc5.herokuapp.com/api/users/getUsersWhere";

      const payload = {
        condition: {}, // Adjust condition if filtering is required
        select: "firstName lastName", // Fields to fetch
        limit: 5, // Max number of results
        skip: 0, // Pagination start
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP appointement error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data); // Assuming the API returns an array of users
        console.log(data)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  // Fetch car details for all appointments
  useEffect(() => {
    async function fetchCarDetails() {
      try {
        setLoading(true);
        const carDetailsMap = {};
        for (const appointment of userAppointmentInfo) {
          const response = await fetch(
            `https://show-room-server-979c93442bc5.herokuapp.com/api/cars/getById/${appointment.carId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Error fetching car details: ${response.statusText}`);
          }

          const carInfo = await response.json();
          carDetailsMap[appointment.carId] = carInfo.model; // Save car name by carId
        }
        setCarDetails(carDetailsMap);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setLoading(false);
      }
    }

    if (userAppointmentInfo.length > 0) {
      fetchCarDetails();
    }
  }, [userAppointmentInfo]);

  // Match user details with appointments (optional feature)
  const getUserName = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "Unknown User";
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">All Appointments</h1>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>User</p>
          <p>Price</p>
          <p>Date & Time</p>
          <p>Car Name</p>
          <p>Action</p>
        </div>

        {/* Appointments */}
        {userAppointmentInfo.map((appointment, index) => (
          <div
            key={appointment._id}
            className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b"
          >
            <p>{index + 1}</p>
            <p>{getUserName(appointment.userId)}</p>
            <p>${appointment.price}</p>
            <p>{new Date(appointment.appointmentDateTime).toLocaleString()}</p>
            <p>{carDetails[appointment.carId] || "Loading..."}</p>
            <button className="text-blue-500 hover:underline">View</button>
          </div>
        ))}

        {!loading && userAppointmentInfo.length === 0 && (
          <p className="p-4 text-center text-gray-500">No appointments found.</p>
        )}

        {loading && <p className="p-4 text-center text-gray-500">Loading...</p>}
      </div>
    </>
  );
};

export default Appointment;
