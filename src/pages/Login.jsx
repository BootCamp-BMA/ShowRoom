import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === "Sign Up" && password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const url =
      state === "Sign Up"
        ? "https://show-room-server-979c93442bc5.herokuapp.com/api/auth/register"
        : "https://show-room-server-979c93442bc5.herokuapp.com/api/auth/login";

    const data = {
      email,
      password,
      ...(state === "Sign Up" && {
        firstName,
        lastName,
        confirmPassword,
        phoneNum,
      }),
    };

    setLoading(true); // Start loading animation

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        const userInfo = result.user.firstName;

        localStorage.setItem("authToken", result.token);
        localStorage.setItem("userInfo", userInfo);
        localStorage.setItem('userDetails',JSON.stringify(result))
        // Emit a custom event to inform other components of the change
        window.dispatchEvent(new Event("storageUpdate"));
        window.dispatchEvent(new Event("storage"));

        navigate("/");
      } else {
        console.error("Error:", result);
        alert("Login failed! Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
      setLoading(false);
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
        } to book an appointment`}</p>

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

        {state === "Sign Up" && (
          <>
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
            <div className='w-full'>
              <p>Phone Number</p>
              <input
                className='border border-[#DADADA] rounded w-full p-2 mt-1'
                type='text'
                value={phoneNum}
                required
                onChange={(e) => setPhoneNum(e.target.value)}
              />
            </div>
          </>
        )}

        <button
          className='bg-primary cursor-pointer text-white w-full py-2 my-2 rounded-md text-base flex items-center justify-center'
          type='submit'
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <span className='flex items-center gap-2'>
              <span className='animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50'></span>
              Loading...
            </span>
          ) : state === "Sign Up" ? (
            "Create Account"
          ) : (
            "Login"
          )}
        </button>

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
