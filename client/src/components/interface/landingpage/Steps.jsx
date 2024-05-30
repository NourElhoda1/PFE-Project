import React from 'react';
import { BiLogOut } from "react-icons/bi";
import { RiFileList3Line } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { HiSearch } from "react-icons/hi";

const Steps = () => {
  return (
    <div className="bg-[#e9e9e9 ] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:justify-between">
          <div className="mb-6 sm:mb-0 sm:mr-6">
            <h5 className="text-lg font-semibold ml-0 mb-2 text-green-500">How it works</h5>
            <h2 className="text-3xl font-bold text-dark mb-4 sm:text-4xl ml-0">Follow our Steps, We <br/> Will Help You</h2>
          </div>
          <div className="mt-2 sm:mt-0">
            <p className="text-lg leading-6 text-gray-500 max-w-2xl mx-auto sm:mx-0">
              Follow the steps below so that you can understand how to find a job and be selected by the company you are applying for and are trusted to work.
            </p>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-4 pb-8 shadow-lg h-full">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-700 rounded-md shadow-lg">
                  <BiLogOut className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Register</h3>
                <p className="mt-5 text-base text-gray-500">
                  If you do not have your account, please register first so you can enter and look for work.
                </p>
              </div>
            </div>
          </div>
          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-4 pb-8 shadow-lg h-full">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-700 rounded-md shadow-lg">
                  <RiFileList3Line className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Create a Resume</h3>
                <p className="mt-5 text-base text-gray-500">
                  You need to build a resume so that clients who see your resume believe in your abilities.
                </p>
              </div>
            </div>
          </div>
          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-4 pb-8 shadow-lg h-full">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-700 rounded-md shadow-lg">
                  <IoCreateOutline className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Post a Service</h3>
                <p className="mt-5 text-base text-gray-500">
                  You can post your services according to your skills and expertise.
                </p>
              </div>
            </div>
          </div>
          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-4 pb-8 shadow-lg h-full">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-700 rounded-md shadow-lg">
                  <HiSearch className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Find a Service</h3>
                <p className="mt-5 text-base text-gray-500">
                  You can also browse and find services that match your requirements and get connected with service providers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
