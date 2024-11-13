import React, { useState } from "react";

const MyProfile = () => {
  const [loading, setLoading] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("userDetails"));
  const userDetails = storedUser.user;

  const [firstName, setFirstName] = useState(userDetails.firstName);
  const [lastName, setLastName] = useState(userDetails.lastName);
  const [phoneNum, setPhoneNum] = useState(userDetails.phoneNum);
  const [photo, setPhoto] = useState("");

  const handleChanges = async (event) => {
    event.preventDefault();
    const updatedUser = { firstName, lastName, phoneNum, photo };
    const url = "https://show-room-server-979c93442bc5.herokuapp.com/api/users/updateUser";
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("No token provided. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        console.log("Profile updated successfully");
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ user: updatedUser })
        );
        // Update state with new values from `localStorage`
        setFirstName(updatedUser.firstName);
        setLastName(updatedUser.lastName);
        setPhoneNum(updatedUser.phoneNum);
        setPhoto(updatedUser.photo);
        window.dispatchEvent(new Event("storageUpdate"));
        window.dispatchEvent(new Event("storage"));
      } else {
        console.error("Error:", result);
        alert("Profile update failed. Please check your data.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form className='mt-4' onSubmit={handleChanges}>
      <div className='flex flex-col gap-5 p-5 bg-white shadow-md rounded-lg max-w-md mx-auto'>
        <h2 className='text-xl font-semibold text-center mb-5'>Edit Profile</h2>

        <label className='text-sm font-medium' htmlFor='firstName'>
          First Name
        </label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type='text'
          id='firstName'
          placeholder='First Name'
          className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <label className='text-sm font-medium' htmlFor='lastName'>
          Last Name
        </label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type='text'
          id='lastName'
          placeholder='Last Name'
          className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <label className='text-sm font-medium' htmlFor='phoneNum'>
          Phone Number
        </label>
        <input
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
          type='tel'
          id='phoneNum'
          placeholder='Phone Number'
          className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <label className='text-sm font-medium' htmlFor='photo'>
          Photo URL
        </label>
        <input
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          type='text'
          id='photo'
          placeholder='Photo URL'
          className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <button
          type='submit'
          className='mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          {loading ? (
            <span className='flex items-center gap-2 justify-center'>
              <span className='animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50'></span>
              Loading...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
};

export default MyProfile;
