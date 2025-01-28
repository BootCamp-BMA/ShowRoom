import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

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
        condition: {},
        select: "firstName lastName",
        limit: 5,
        skip: 0,
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
          throw new Error(`HTTP appointment error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        setUsers(data);
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

  // Match user details with appointments
  const getUserName = (userId) => {
    const user = users.find((user) => user.userId === userId);
    return user ? `${user.firstName} ${user.lastName}` : "Unknown User";
  };

  // Handle Accept Appointment
  const handleAccept = async (appointmentId) => {
    try {
      console.log("Updating appointmentId:", appointmentId); // Debugging
      const response = await fetch(
        `https://show-room-server-979c93442bc5.herokuapp.com/api/appointement/update/${appointmentId}`, // Corrected endpoint
        {
          method: "PUT", // Change to PUT or PATCH if needed
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ status: "confirmed" }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error updating status: ${response.status} - ${errorText}`);
      }

      // Update local state
      setUserAppointmentInfo((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: "confirmed" }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }
  };

  // Handle Decline Appointment
  const handleDecline = async (appointmentId) => {
    try {
      const response = await fetch(
        `https://show-room-server-979c93442bc5.herokuapp.com/api/appointement/update/${appointmentId}`, // Corrected endpoint
        {
          method: "PUT", // Change to PUT or PATCH if needed
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({  status: "canceled" }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error updating status: ${response.status} - ${errorText}`);
      }
      console.log("apointement id ",appointmentId)
      // Update the local state
      setUserAppointmentInfo((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: "canceled" }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error declining appointment:", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">All Appointments</h1>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_2fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>User</p>
          <p>Price</p>
          <p>Date & Time</p>
          <p>Car Name</p>
          <p>Actions</p>
        </div>

        {/* Appointments */}
        {userAppointmentInfo.map((appointment, index) => (
          <div
            key={appointment._id}
            className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_2fr] grid-flow-col py-3 px-6 border-b"
          >

            <p>{index + 1}</p>
            <p>{getUserName(appointment.userId)}</p>
            <p>${appointment.price}</p>
            <p>{new Date(appointment.appointmentDateTime).toLocaleString()}</p>
            <p>{carDetails[appointment.carId] || "Loading..."}</p>
            <div className="flex gap-2">
              {appointment.status === "pending" && (
                <>
                  <button
                    onClick={() => handleAccept(appointment._id)}
                    className="bg-green-500 text-white py-1 px-3 rounded flex items-center gap-1 hover:bg-green-600"
                  >
                    <AiOutlineCheckCircle />
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(appointment._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded flex items-center gap-1 hover:bg-red-600"
                  >
                    <AiOutlineCloseCircle />
                    Decline
                  </button>
                </>
              )}
              {appointment.status !== "pending" && (
                <span
                  className={`py-1 px-3 rounded ${
                    appointment.status === "confirmed"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {appointment.status}
                </span>
              )}
            </div>
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
