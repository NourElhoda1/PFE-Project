import React from "react";

function ChangePassword() {
  return (
    <div >
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      <div>

        <div className="flex flex-col  ">
          <label className="text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>

        <div className="flex flex-col ">
          <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="new_password">
              New Password
            </label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              placeholder="Enter your new password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
        </div>

        <div className="flex flex-col ">
          <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="new_password">
              Confirm password
            </label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              placeholder="Enter your new password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
        </div>
      
      </div>
    </div>
  );
}

export default ChangePassword;
