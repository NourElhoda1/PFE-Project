import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import AuthAxios from "../../../helpers/request";
import { updateAdherentEducation } from "../../../app/adherentSlice";

function Education() {
  const [educationList, setEducationList] = useState([
    {
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const [profile, setProfile] = useState({});
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
          setProfile(parsedProfile);
          setEducationList(parsedProfile.education || []);
          console.log("Parsed profile data:", parsedProfile);
        }
      } catch (error) {
        console.error("Error parsing profile data:", error);
      }
    }
    setLoading(false);
  }, []);

  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEducationList = [...educationList];
    updatedEducationList[index] = { ...updatedEducationList[index], [name]: value };
    setEducationList(updatedEducationList);
  };

  const addEducation = () => {
    setEducationList([
      ...educationList,
      {
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    const updatedEducationList = [...educationList];
    updatedEducationList.splice(index, 1);
    setEducationList(updatedEducationList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      const response = await AuthAxios.put(
        "http://localhost:8000/v1/adherent/profile/update/education",
        { educationList },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedProfile = response.data.adherent;
      setProfile(updatedProfile);
      Cookies.set("profile", JSON.stringify(updatedProfile));
      dispatch(updateAdherentEducation(updatedProfile));
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
    <div className="container mx-auto">
      <div className="bg-white p-4 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {educationList.map((education, index) => (
            <div key={index} className="space-y-4 border-b border-gray-200 pb-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  value={education.institution}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Enter institution name"
                  className="mt-1 p-2 block w-full border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Degree
                </label>
                <input
                  type="text"
                  name="degree"
                  value={education.degree}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Enter degree"
                  className="mt-1 p-2 block w-full border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Field of Study
                </label>
                <input
                  type="text"
                  name="field"
                  value={education.field}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Enter field of study"
                  className="mt-1 p-2 block w-full border rounded-lg"
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={education.startDate}
                    onChange={(e) => handleEducationChange(index, e)}
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
                    value={education.endDate}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="mt-1 p-2 block w-full border rounded-lg"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="text-red-600 hover:text-red-900 mt-2"
              >
                Remove Education
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Add Education
          </button>
          <div className="text-right">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Education
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
}

export default Education;
