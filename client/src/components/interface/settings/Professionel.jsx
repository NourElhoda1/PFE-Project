import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import AuthAxios from "../../../helpers/request";
import { updateAdherentExperience } from "../../../app/adherentSlice";

function Professional() {
  const [experiencesList, setExperiencesList] = useState([{
    company: "",
    role: "",
    type: "",
    startDate: "",
    endDate: ""
  }]);

  const typeOptions = ["Full-time", "Part-time", "Internship"];
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const profileData = Cookies.get("profile");
    if (profileData) {
      try {
        const parsedProfile = JSON.parse(profileData);
        setProfile(parsedProfile);
        setExperiences(parsedProfile.experiencesList || []);
      } catch (error) {
        console.error("Error parsing profile data:", error);
      }
    }
    setLoading(false);
  }, []);

  const handleExperienceChange = (index, event) => {
    const { name, value } = event.target;
    setExperiencesList((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };
      return updatedExperiences;
    });
  };

  const addExperience = () => {
    setExperiencesList((prevExperiences) => [
      ...prevExperiences,
      { company: "", role: "", type: "", startDate: "", endDate: "" }
    ]);
  };

  const removeExperience = (index) => {
    setExperiencesList((prevExperiences) => prevExperiences.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
        const response = await AuthAxios.put(
            "http://localhost:8000/v1/adherent/profile/update/experience",
            { experiencesList }, // Ensure this matches the schema
            { headers: { Authorization: `Bearer ${token}` } }
        );

        const updatedProfile = response.data.adherent;
        setProfile(updatedProfile);
        Cookies.set("profile", JSON.stringify(updatedProfile));
        dispatch(updateAdherentExperience(updatedProfile));
        setMessage("Profile updated successfully!");

        setTimeout(() => setMessage(""), 3000);
    } catch (error) {
        console.error("Error updating profile:", error);
        setMessage(error.response?.status === 403
            ? "You are not authorized to update this profile."
            : "Failed to update profile. Please try again."
        );
    }
};


  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="bg-white p-4 md:p-8">
        {message && <div className="alert">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {experiencesList.map((experience, index) => (
            <div key={index} className="space-y-4 border-b border-gray-200 pb-4 mb-4">
              <ExperienceInput
                experience={experience}
                index={index}
                handleExperienceChange={handleExperienceChange}
                removeExperience={removeExperience}
                typeOptions={typeOptions}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addExperience}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Add Experience
          </button>
          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-md shadow-sm "
            >
              Save 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ExperienceInput({ experience, index, handleExperienceChange, removeExperience, typeOptions }) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company
        </label>
        <input
          type="text"
          name="company"
          value={experience.company}
          onChange={(e) => handleExperienceChange(index, e)}
          placeholder="Enter company name"
          className="mt-1 p-2 block w-full border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <input
          type="text"
          name="role"
          value={experience.role}
          onChange={(e) => handleExperienceChange(index, e)}
          placeholder="Enter role"
          className="mt-1 p-2 block w-full border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          name="type"
          value={experience.type}
          onChange={(e) => handleExperienceChange(index, e)}
          className="mt-1 p-2 block w-full border rounded-lg"
        >
          <option value="" disabled>Select type</option>
          {typeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-4">
        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={experience.startDate}
            onChange={(e) => handleExperienceChange(index, e)}
            className="mt-1 p-2 block w-full border rounded-lg"
          />
        </div>
        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={experience.endDate}
            onChange={(e) => handleExperienceChange(index, e)}
            className="mt-1 p-2 block w-full border rounded-lg"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeExperience(index)}
        className="text-red-600 hover:text-red-900 mt-2"
      >
        Remove Experience
      </button>
    </>
  );
}

export default Professional;
