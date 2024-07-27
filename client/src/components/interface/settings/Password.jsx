
import React, { useState } from "react";
import AuthAxios from "../../../helpers/request";
import { useDispatch } from "react-redux";
function Password( ) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("User not authenticated");
      return;
    }
  
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
  
    try {
      console.log("Sending request to update password");
      await AuthAxios.put(
        "http://localhost:8000/v1/adherent/profile/update/password",
        { password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setMessage("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password", error);
      if (error.message === "Network Error") {
        setMessage("Network error. Please check if the server is running.");
      } else if (error.response && error.response.status === 403) {
        setMessage("You are not authorized to update the password.");
      } else {
        setMessage("Failed to update password. Please try again.");
      }
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Update Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 p-2 block w-full border rounded"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-gray-700 mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="mt-1 p-2 block w-full border rounded"
          />
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md shadow-sm "
          >
            Save
          </button>
          
        </div>
      </form>
    </div>
  );
}
export default Password;
