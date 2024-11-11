import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState(""); // Using phoneNum here
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Password validation
    if (state === "Sign Up" && password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Choose correct API endpoint
    const url =
      state === "Sign Up"
        ? "https://show-room-server-979c93442bc5.herokuapp.com/api/auth/register"
        : "https://show-room-server-979c93442bc5.herokuapp.com/api/auth/login";

    // Create request data
    const data = {
      email,
      password,
      ...(state === "Sign Up" && {
        firstName,
        lastName,
        confirmPassword,
        phoneNum, // Using phoneNum here
      }),
    };

    try {
      // Send request to server
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Parse response
      const result = await response.text(); // Use text() initially to handle unexpected HTML responses
      console.log("Response:", result);

      if (response.ok) {
        const data = JSON.parse(result);
        console.log("Success:", data);

        // Store user data in localStorage
        const userInfo = {
          firstName: data.user.firstName,
          email: data.user.email,
          password: data.user.password,
          lastName:data.user.lastName,
          phoneNum:data.user.phoneNum,
        };

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userInfo", userInfo.firstName); // Store the whole object

        // Redirect to home page
        navigate("/");
      } else {
        console.error("Error:", JSON.parse(result));
        alert("Login failed! Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form
      action=''
      className='min-h-[80vh] flex items-center'
      onSubmit={onSubmitHandler}
    >
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>{`Please ${
          state === "Sign Up" ? "Sign Up" : "Login"
        } to book appointment`}</p>

        {/* Full Name Field for Sign Up */}
        {state === "Sign Up" && (
          <>
            <div className='w-full'>
              <p>First Name</p>
              <input
                className='border border-[#DADADA] rounded w-full p-2 mt-1'
                type='text'
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='w-full'>
              <p>Last Name</p>
              <input
                className='border border-[#DADADA] rounded w-full p-2 mt-1'
                type='text'
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
        )}

        {/* Email Field */}
        <div className='w-full'>
          <p>Email</p>
          <input
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className='w-full'>
          <p>Password</p>
          <input
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password Field */}
        {state === "Sign Up" && (
          <div className='w-full'>
            <p>Confirm Password</p>
            <input
              className='border border-[#DADADA] rounded w-full p-2 mt-1'
              type='password'
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}

        {state === "Sign Up" && (
          <div className='w-full'>
            <p>Phone Number</p>
            <input
              className='border border-[#DADADA] rounded w-full p-2 mt-1'
              type='text'
              value={phoneNum} // Using phoneNum here
              required
              onChange={(e) => setPhoneNum(e.target.value)} // Using setPhoneNum here
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          className='bg-primary cursor-pointer text-white w-full py-2 my-2 rounded-md text-base'
          type='submit'
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Toggle between Login and Sign Up */}
        <p>
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <a
                onClick={() => setState("Login")}
                className='text-primary cursor-pointer'
              >
                Login here
              </a>
            </>
          ) : (
            <>
              Create a new account?{" "}
              <a
                onClick={() => setState("Sign Up")}
                className='text-primary cursor-pointer'
              >
                Click here
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
