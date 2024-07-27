import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import login1 from "../../assets/login1.png";
import AuthAxios from "../../helpers/request";

function AdherentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const login = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to log in...");
      const res = await axios.post("http://localhost:8000/v1/adherents/login", { email, password });
      console.log("Login response:", res.data);

      const token = res.data.token;
      if (!token) {
        throw new Error("No token received");
      }

      // Save token in cookies
      Cookies.set("token", token);

      // Fetch profile with the token
      await fetchProfile(token);

      navigate("/");
    } catch (err) {
      console.error("Error during login:", err);
      setErrors(err.response?.data || { general: err.message });
    }
  };

  const fetchProfile = async (token) => {
    try {
        console.log("Fetching profile...");
        const profileResponse = await AuthAxios.get("http://localhost:8000/v1/adherent/profile", {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Profile response:", profileResponse.data);

        // Adjust extraction based on the actual response structure
        const profileData = profileResponse.data?.data || profileResponse.data;
        console.log("Extracted profile data:", profileData);

        // Since profile data is nested within 'adherent', access '_id' from there
        const adherentData = profileData?.adherent;

        if (!adherentData || !adherentData._id) {
            console.error("Profile data is missing _id:", adherentData);
            throw new Error("Profile data does not contain _id");
        }

        // Save adherent data in cookies
        Cookies.set("profile", JSON.stringify(adherentData));
    } catch (err) {
        console.error("Error fetching profile:", err);
        throw err;
    }
};

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2">
        <img src={login1} alt="Left side" className="w-full h-full" />
      </div>
      <div className="flex items-center justify-center w-full lg:w-1/2 bg-white p-6 sm:p-10">
        <div className="w-full max-w-md p-6">
          <h1 className="text-3xl mb-2 font-bold text-green-600">Welcome Back!</h1>
          <p className="mb-4 text-green-550 text-2xl font-semibold">Let's Achieve More Together</p>
          <form onSubmit={login} className="mt-8 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="email" className="block font-medium text-lg text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
              </div>
              <div>
                <label htmlFor="password" className="block font-medium text-lg text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.password && <span className="text-red-500">{errors.password}</span>}
              </div>
            </div>
            <div className="mb-2">
            <p><Link to="/register" className="text-green-600 hover:text-green-800 transition-colors duration-300">Forget password? </Link></p>
          </div>
            <div className="flex justify-end mt-2 space-x-2">
              <button
                type="submit"
                className="block w-full bg-green-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Log in
              </button>
            </div>
            {errors.general && <span className="text-red-500">{errors.general}</span>}
          </form>

          <div className="text-center mb-2">
            <p>Don't have an account? <Link to="/register" className="text-green-600 hover:text-green-800 transition-colors duration-300">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdherentLogin;
