import React, { useState } from "react";

function Education({ onSave }) {
  const [educationList, setEducationList] = useState([
    {
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    },
  ]);

  // Gérer les changements dans les champs d'entrée de l'éducation
  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEducationList = [...educationList];
    updatedEducationList[index] = { ...updatedEducationList[index], [name]: value };
    setEducationList(updatedEducationList);
  };

  // Ajouter une nouvelle entrée d'éducation
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

  // Supprimer une entrée d'éducation
  const removeEducation = (index) => {
    const updatedEducationList = [...educationList];
    updatedEducationList.splice(index, 1);
    setEducationList(updatedEducationList);
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gestion de la soumission du formulaire
    console.log(educationList);
  };

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
                      value={education.endDate}
                      onChange={(e) => handleExperienceChange(index, e)}
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
        </div>
      </div>
  );
}

export default Education;