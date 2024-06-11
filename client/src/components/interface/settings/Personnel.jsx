import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import AuthAxios from "../../../helpers/request";
import { updateAdherentInfo } from "../../../app/adherentSlice";

function Personnel( ) {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    number: "",
    email: "",
    country: "",
    city: "",
    profile_pic: null,
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const profileData = Cookies.get("profile");
    console.log("Profile data from cookie:", profileData);
    if (profileData) {
      try {
        const parsedProfile = JSON.parse(profileData);
        if (parsedProfile) {
          setProfile({
            ...parsedProfile,
            profile_pic: parsedProfile.profile_pic || null,
          });
          console.log("Parsed profile data:", parsedProfile);
        }
      } catch (error) {
        console.error("Error parsing profile data:", error);
      }
    }
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfile({ ...profile, profile_pic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile.first_name || !profile.last_name || !profile.number || !profile.email || !profile.country || !profile.city) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const token = Cookies.get("token");

    try {
      const { first_name, last_name, number, email, country, city } = profile;
      const response = await AuthAxios.put(
        "http://localhost:8000/v1/adherent/profile/update/information",
        { first_name, last_name, number, email, country, city },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedProfile = response.data;
      setProfile(updatedProfile);
      Cookies.set("profile", JSON.stringify(updatedProfile));
      dispatch(updateAdherentInfo(updatedProfile));
      setMessage("Profile updated successfully!");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response && error.response.status === 403) {
        setMessage("You are not authorized to update this profile.");
      } else {
        setMessage("Failed to update profile. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="h-96 bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 grid-rows-3 gap-4 py-4 px-12 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              type="text"
              name="first_name"
              value={profile.first_name}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              type="text"
              name="last_name"
              value={profile.last_name}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="col-start-1 row-start-2">
            <label className="block text-sm font-medium text-gray-700">
              Number
            </label>
            <input
              type="text"
              name="number"
              value={profile.number}
              onChange={handleInputChange}
              placeholder="Enter your number"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="col-start-2 row-start-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="col-start-1 row-start-3">
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={profile.country}
              onChange={handleInputChange}
              placeholder="Enter your country"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="col-start-2 row-start-3">
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={profile.city}
              onChange={handleInputChange}
              placeholder="Enter your city"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="row-span-3 col-start-3 row-start-1 ml-9">
            <label className="block px-10 text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <div className="flex justify-center items-center flex-col">
              <span className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                {profile.profile_pic ? (
                  <img
                    src={URL.createObjectURL(profile.profile_pic)}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 0v24H0V0h24z" fill="none" />
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </span>
              <label
                htmlFor="file-upload"
                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upload Image
              </label>
              <input
                id="file-upload"
                name="profile_pic"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
            </div>
          </div>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
      {message && (
        <div className="text-green-600">{message}</div>
      )}
    </div>
  );
}

export default Personnel;
