import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import AuthAxios from "../../../helpers/request";
import { updateAdherentPortfolio } from "../../../app/adherentSlice";

function Projects() {
  const [projectList, setProjectList] = useState([
    {
      name: "",
      description: "",
      pic: [],
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
          setProjectList(parsedProfile.projects || []);
          console.log("Parsed profile data:", parsedProfile);
        }
      } catch (error) {
        console.error("Error parsing profile data:", error);
      }
    }
    setLoading(false);
  }, []);

  const handleProjectChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProjectList = [...projectList];
    updatedProjectList[index] = { ...updatedProjectList[index], [name]: value };
    setProjectList(updatedProjectList);
  };

  const handlePicChange = (index, picIndex, event) => {
    const { value } = event.target;
    const updatedProjectList = [...projectList];
    updatedProjectList[index].pic[picIndex] = value;
    setProjectList(updatedProjectList);
  };

  const addProject = () => {
    setProjectList([
      ...projectList,
      {
        name: "",
        description: "",
        pic: [],
      },
    ]);
  };

  const addPic = (index) => {
    const updatedProjectList = [...projectList];
    updatedProjectList[index].pic.push("");
    setProjectList(updatedProjectList);
  };

  const removeProject = (index) => {
    const updatedProjectList = [...projectList];
    updatedProjectList.splice(index, 1);
    setProjectList(updatedProjectList);
  };

  const removePic = (index, picIndex) => {
    const updatedProjectList = [...projectList];
    updatedProjectList[index].pic.splice(picIndex, 1);
    setProjectList(updatedProjectList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
  
    if (!token) {
      setMessage("Authorization token is missing. Please log in again.");
      return;
    }
  
    console.log("Token:", token);
  
    try {
      const response = await AuthAxios.put(
        "http://localhost:8000/v1/adherent/profile/update/portfolio",
        { projectList },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      const updatedProfile = response.data.adherent;
      setProfile(updatedProfile);
      Cookies.set("profile", JSON.stringify(updatedProfile));
      dispatch(updateAdherentPortfolio(updatedProfile));
      setMessage("Profile updated successfully!");
  
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response && error.response.status === 401) {
        setMessage("Unauthorized. Please log in again.");
      } else if (error.response && error.response.status === 403) {
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
          {projectList.map((project, index) => (
            <div key={index} className="space-y-4 border-b border-gray-200 pb-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={project.name}
                  onChange={(e) => handleProjectChange(index, e)}
                  placeholder="Enter project name"
                  className="mt-1 p-2 block w-full border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, e)}
                  placeholder="Enter project description"
                  className="mt-1 p-2 block w-full border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pictures
                </label>
                {project.pic.map((pic, picIndex) => (
                  <div key={picIndex} className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      value={pic}
                      onChange={(e) => handlePicChange(index, picIndex, e)}
                      placeholder="Enter picture URL"
                      className="mt-1 p-2 block w-full border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePic(index, picIndex)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addPic(index)}
                  className="text-indigo-600 hover:text-indigo-900 mt-2"
                >
                  Add Picture
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="text-red-600 hover:text-red-900 mt-2"
              >
                Remove Project
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addProject}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Add Project
          </button>
          <div className="text-right">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Projects
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
}

export default Projects;
