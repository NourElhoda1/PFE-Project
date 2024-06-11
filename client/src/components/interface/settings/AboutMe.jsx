import React, { useState } from "react";

function AboutMe({ onSave }) {
  const [profile, setProfile] = useState({
    careerStatus: { status: "" }, // Champ pour le statut de carrière
    about: "", // Champ pour la description
    skills: [], // Tableau pour les compétences
    languages: [], // Tableau pour les langues
  });

  // Options pour les langues et niveaux de compétence
  const languageOptions = ["English", "French", "Spanish", "German", "Chinese", "Japanese", "Italien"];
  const proficiencyOptions = ["Beginner", "Intermediate", "Advanced"];

  // Gérer les changements d'input pour les informations de base
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Gérer les changements dans le statut de carrière
  const handleCareerStatusChange = (e) => {
    setProfile({ ...profile, careerStatus: { status: e.target.value } });
  };

  // Gérer les changements dans les langues
  const handleLanguageChange = (index, event) => {
    const { name, value } = event.target;
    const updatedLanguages = [...profile.languages];
    updatedLanguages[index] = { ...updatedLanguages[index], [name]: value };
    setProfile({ ...profile, languages: updatedLanguages });
  };

  // Ajouter une nouvelle langue
  const addLanguage = () => {
    setProfile({
      ...profile,
      languages: [...profile.languages, { language: "", proficiency: "" }],
    });
  };

  // Supprimer une langue
  const removeLanguage = (index) => {
    const updatedLanguages = [...profile.languages];
    updatedLanguages.splice(index, 1);
    setProfile({ ...profile, languages: updatedLanguages });
  };

  // Gérer les changements dans les compétences
  const handleSkillsChange = (e, index) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index] = e.target.value;
    setProfile({ ...profile, skills: updatedSkills });
  };

  // Ajouter une nouvelle compétence
  const addSkill = () => {
    setProfile({
      ...profile,
      skills: [...profile.skills, ""],
    });
  };

  // Supprimer une compétence
  const removeSkill = (index) => {
    const updatedSkills = [...profile.skills];
    updatedSkills.splice(index, 1);
    setProfile({ ...profile, skills: updatedSkills });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gestion de la soumission du formulaire
    onSave(profile); // Appel de la fonction onSave avec le profil en argument
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white p-4 md:p-8 ">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Career Status
                </label>
                <input
                  type="text"
                  name="status"
                  value={profile.careerStatus.status}
                  onChange={handleCareerStatusChange}
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
          {/* Section pour les compétences */}
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
          {/* Section pour ajouter des langues */}
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
              className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AboutMe;