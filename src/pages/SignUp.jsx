import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {handleFormSubmit} from '../Function/HandleSubmit'

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmitHandler = async (event) => {

    const url = "https://show-room-server-979c93442bc5.herokuapp.com/api/auth/register";

    const data = { email, password,firstName,lastName,phoneNum,confirmPassword };

    handleFormSubmit({event,url,data,setLoading,navigate})
  };
  return (
    <form
      action=''
      className='min-h-[80vh] flex items-center'
      onSubmit={onSubmitHandler}
    >
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>Create Account</p>
        <p>Sign Upto book an appointment</p>

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
          ) : (
            "Create Account"
          )}
        </button>

        <p>
          <>
            Already have an account? {" "}
            <a
              onClick={() => navigate("/login")}
              className='text-primary cursor-pointer'
            >
              Login here
            </a>
          </>
          
        </p>
      </div>
    </form>
  );
};

export default SignUp;
