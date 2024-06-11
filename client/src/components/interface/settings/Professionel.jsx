import React, { useState } from "react";

function Professional({ onSave }) {
  const [experiences, setExperiences] = useState([
    {
      company: "",
      role: "",
      type: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const typeOptions = ["Full-time", "Part-time", "Internship"];

  // Gérer les changements dans les champs d'entrée de l'expérience professionnelle
  const handleExperienceChange = (index, event) => {
    const { name, value } = event.target;
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };
    setExperiences(updatedExperiences);
  };

  // Ajouter une nouvelle entrée d'expérience
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        role: "",
        type: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  // Supprimer une entrée d'expérience
  const removeExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gestion de la soumission du formulaire
    console.log(experiences);
  };

  return (
      <div className="container mx-auto">
        <div className="bg-white p-4 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {experiences.map((experience, index) => (
              <div key={index} className="space-y-4 border-b border-gray-200 pb-4 mb-4">
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
                className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Experience
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default Professional;