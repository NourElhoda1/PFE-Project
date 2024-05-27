import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginPic from "../../assets/login.jpg";

function UserLogin() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await axios.post("http://localhost:8000/v1/users/login", { email, password });

      if (loginResponse.data.token) {
        localStorage.setItem("token", loginResponse.data.token);

        const profileResponse = await axios.get("http://localhost:8000/v1/user/profile", {
          headers: { Authorization: `Bearer ${loginResponse.data.token}` },
        });

        localStorage.setItem("profile", JSON.stringify(profileResponse.data));
        navigate("/dashboard");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="h-screen flex">
      <img src={loginPic} alt="Login" className="flex w-1/2"/>
      <div className="flex w-1/2 justify-center items-center bg-white">
        <form className="bg-white" onSubmit={login}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <label htmlFor="email">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
              </svg>
            </label>
            <input
              id="email"
              className="pl-2 outline-none border-none"
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <label htmlFor="password">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
            </label>
            <input
              id="password"
              className="pl-2 outline-none border-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="block w-full bg-[#009637] mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
