import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import AuthAxios from "../../../helpers/request";
import { updateAdherentAbout } from "../../../app/adherentSlice";

function AboutMe() {
  const [profile, setProfile] = useState({
    careerStatus: "",
    about: "",
    skills: [],
    languages: [],
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
          setProfile((prevProfile) => ({
            ...prevProfile,
            careerStatus: parsedProfile.careerStatus || "",
            about: parsedProfile.about || "",
            skills: Array.isArray(parsedProfile.skills) ? parsedProfile.skills : [],
            languages: Array.isArray(parsedProfile.languages) ? parsedProfile.languages : [],
          }));
          console.log("Parsed profile data:", parsedProfile);
        }
      } catch (error) {
        console.error("Error parsing profile data:", error);
      }
    }
    setLoading(false);
  }, []);


  const languageOptions = ["English", "French", "Spanish", "German", "Chinese", "Japanese", "Italian"];
  const proficiencyOptions = ["Beginner", "Intermediate", "Advanced"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleLanguageChange = (index, event) => {
    const { name, value } = event.target;
    const updatedLanguages = [...profile.languages];
    updatedLanguages[index] = { ...updatedLanguages[index], [name]: value };
    setProfile({ ...profile, languages: updatedLanguages });
  };

  const addLanguage = () => {
    setProfile({
      ...profile,
      languages: [...profile.languages, { language: "", proficiency: "" }],
    });
  };

  const removeLanguage = (index) => {
    const updatedLanguages = [...profile.languages];
    updatedLanguages.splice(index, 1);
    setProfile({ ...profile, languages: updatedLanguages });
  };

  const handleSkillsChange = (e, index) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index] = e.target.value;
    setProfile({ ...profile, skills: updatedSkills });
  };

  const addSkill = () => {
    setProfile({
      ...profile,
      skills: [...profile.skills, ""],
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = [...profile.skills];
    updatedSkills.splice(index, 1);
    setProfile({ ...profile, skills: updatedSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    try {
      const { careerStatus, about, skills, languages } = profile;
      const response = await AuthAxios.put(
        "http://localhost:8000/v1/adherent/profile/update/about",
        { careerStatus, about, skills, languages },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    
      const updatedProfile = response.data;
      setProfile(updatedProfile);
      Cookies.set("profile", JSON.stringify(updatedProfile));
      dispatch(updateAdherentAbout(updatedProfile));
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
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Career Status
                </label>
                <input
                  type="text"
                  name="careerStatus"
                  value={profile.careerStatus}
                  onChange={handleInputChange}
                  placeholder="Enter your career status"
                  className="mt-1 p-2 block w-full border rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  About
                </label>
                <textarea
                  name="about"
                  value={profile.about}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  className="mt-1 p-2 block w-full border rounded-lg"
                  rows="4"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            {profile.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillsChange(e, index)}
                  placeholder="Skill"
                  className="mt-1 p-2 block w-full border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-600 hover:text-red-900"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSkill}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Add Skill
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Languages
            </label>
            {profile.languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <select
                  name="language"
                  value={lang.language}
                  onChange={(e) => handleLanguageChange(index, e)}
                  className="mt-1 p-2 block w-full border rounded-lg"
                >
                  <option value="">Select Language</option>
                  {languageOptions.map((language, i) => (
                    <option key={i} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
                <select
                  name="proficiency"
                  value={lang.proficiency}
                  onChange={(e) => handleLanguageChange(index, e)}
                  className="mt-1 p-2 block w-full border rounded-lg"
                >
                  <option value="">Select Proficiency</option>
                  {proficiencyOptions.map((proficiency, i) => (
                    <option key={i} value={proficiency}>
                      {proficiency}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="text-red-600 hover:text-red-900"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLanguage}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Add Language
            </button>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
        {message && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default AboutMe;
