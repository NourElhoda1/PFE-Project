import React, { useState } from "react";
import Sidebar from "../../layout/Sidebar";
import UserOverview from "../../components/dashboard/profileUser/UserOverView";
import UserUpdateInfo from "../../components/dashboard/profileUser/UserUpdateInfo";
import ChangePassword from "../../components/dashboard/profileUser/ChangePassword";

function UserProfile() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='flex bg-gray-300'>
      <div>
        <Sidebar />
      </div>
      <div className='flex-1 p-5 pt-10'>
        <h1 className="text-2xl text-gray-900 font-semibold">Profile</h1>
        <div className="pr-20 -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 px-6 align-middle md:px-6 lg:px-8">
            <div className="mt-8 overflow-hidden bg-white border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <div className="mt-2 px-6  flex border-b border-gray-200">
                <button
                  className={`px-4  py-2 text-gray-600 focus:outline-none ${activeTab === 'overview' && 'border-b-2 border-secondary'}`}
                  onClick={() => handleTabClick('overview')}
                >
                  Overview
                </button>
                <button
                  className={`px-4 py-2 text-gray-600 focus:outline-none ${activeTab === 'edit' && 'border-b-2 border-secondary'}`}
                  onClick={() => handleTabClick('edit')}
                >
                  Edit
                </button>
                <button
                  className={`px-4 py-2 text-gray-600 focus:outline-none ${activeTab === 'changePassword' && 'border-b-2 border-secondary'}`}
                  onClick={() => handleTabClick('changePassword')}
                >
                  Change Password
                </button>
              </div>

              <div className="mt-2 p-4">
                {activeTab === 'overview' && <UserOverview />}
                {activeTab === 'edit' && <UserUpdateInfo handleTabClick={handleTabClick} />}
                {activeTab === 'changePassword' && <ChangePassword />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
