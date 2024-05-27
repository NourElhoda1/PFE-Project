import React from "react";

function ChangePassword() {
  return (
    <div >
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      <div>

        <div className="flex flex-col  ">
          <label className="text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="mt-1 p-2 block w-full border rounded"
          />
        </div>

        <div className="flex flex-col ">
          <label className="text-gray-700 mt-4 mb-2" htmlFor="new_password">
              New Password
            </label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              placeholder="Enter your new password"
              className="mt-1 p-2 block w-full border rounded"
            />
        </div>

        <div className="flex flex-col ">
          <label className="text-gray-700 mt-4 mb-2" htmlFor="new_password">
              Confirm password
            </label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              placeholder="Enter your new password"
              className="mt-1 p-2 block w-full border rounded"
            />
        </div>
      
      </div>
    </div>
  );
}

export default ChangePassword;
