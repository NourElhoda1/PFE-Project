import React, { useState } from "react";
import Navbar from "../../layout/Navbar/Navbar";
import Personnel from "../../components/interface/settings/Personnel";
import AboutMe from "../../components/interface/settings/AboutMe";
import Education from "../../components/interface/settings/Education";
import Projects from "../../components/interface/settings/Projects";
import Professionel from "../../components/interface/settings/Professionel";

function AdherentSettings() {
  const [activeTab, setActiveTab] = useState('personnel');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='bg-gray-300 min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex-1 p-5 md:mx-10'>
        <h1 className="text-2xl text-gray-900 font-semibold mb-4">Settings</h1>
        <div className="bg-white border border-gray-200 dark:border-gray-700 md:rounded-lg w-full">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 text-gray-600 focus:outline-none ${activeTab === 'personnel' && 'border-b-2 border-secondary'}`}
              onClick={() => handleTabClick('personnel')}
            >
              Informations Personnel
            </button>
            <button
              className={`px-4 py-2 text-gray-600 focus:outline-none ${activeTab === 'aboutme' && 'border-b-2 border-secondary'}`}
              onClick={() => handleTabClick('aboutme')}
            >
              About Me
            </button>
            <button
              className={`px-4 py-2 text-gray-600 focus:outline-none ${activeTab === 'education' && 'border-b-2 border-secondary'}`}
              onClick={() => handleTabClick('education')}
            >
              Education
            </button>
            <button
              className={`px-4 py-2 text-gray-600 focus:outline-none ${activeTab === 'Projects' && 'border-b-2 border-secondary'}`}
              onClick={() => handleTabClick('Projects')}
            >
              Portfolio  
            </button>
            <button
              className={`px-4 py-2 text-gray-600 focus:outline-none ${activeTab === 'professionel' && 'border-b-2 border-secondary'}`}
              onClick={() => handleTabClick('professionel')}
            >
              Experience  
            </button>
          </div>
          <div className="p-4">
            {activeTab === 'personnel' && <Personnel />}
            {activeTab === 'aboutme' && <AboutMe />}
            {activeTab === 'education' && <Education />}
            {activeTab === 'Projects' && < Projects/>}
            {activeTab === 'professionel' && <Professionel />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdherentSettings;
