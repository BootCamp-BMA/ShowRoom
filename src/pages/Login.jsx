import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {handleFormSubmit} from '../Function/HandleSubmit'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
   

    const url = "https://show-room-server-979c93442bc5.herokuapp.com/api/auth/login";

    const data = { email, password };
    handleFormSubmit({event,url,data,setLoading,navigate})
  };

  return (
    <form
      className="min-h-[80vh] flex items-center"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">Login</p>
        <p>Login to book an appointment</p>

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-primary cursor-pointer text-white w-full py-2 my-2 rounded-md text-base flex items-center justify-center"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50"></span>
              Loading...
            </span>
          ) : (
            "Login"
          )}
        </button>
        <p>
          <>
            Create new Account ?{ " "}
            <a
              onClick={() => navigate("/signup")}
              className='text-primary cursor-pointer'
            >
              SignUp Here 
            </a>
          </>
          
        </p>
      </div>
    </form>
  );
};

export default Login;
