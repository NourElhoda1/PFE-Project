import React, { useState, useEffect } from "react";
import AuthAxios from "../../../helpers/request";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../../../app/userSlice";

function UserUpdateInfo({ handleTabClick }) {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: ""
  });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const profileData = localStorage.getItem("profile");
    if (profileData) {
      setProfile(JSON.parse(profileData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("User not authenticated");
      return;
    }

    try {
      const { first_name, last_name, user_name, email } = profile;

      const response = await AuthAxios.put(
        "http://localhost:8000/v1/user/profile/update/information",
        { first_name, last_name, user_name, email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfile(response.data);
      localStorage.setItem("profile", JSON.stringify(response.data));
      dispatch(updateUserInfo(response.data));
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      if (error.response && error.response.status === 403) {
        setMessage("You are not authorized to update this profile.");
      } else {
        setMessage("Failed to update profile. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Update Profile Info</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={profile.first_name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={profile.last_name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="user_name">
              User Name
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={profile.user_name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button 
            type="submit" 
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md focus:outline-none focus:bg-gray-600"
          >
            Save
          </button>
          <button 
            type="button" 
            onClick={() => handleTabClick('overview')} 
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md focus:outline-none focus:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserUpdateInfo;
