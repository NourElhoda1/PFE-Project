import React from "react";
import { Link } from "react-router-dom";

const UserTable = ({ users, currentPage, itemsPerPage, blockOrUnblock }) => {
  

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="py-3.5 px-12 text-base font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Name
                </th>
                <th scope="col" className="py-3.5 text-base font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Username
                </th>
                <th scope="col" className="px-4 py-3.5 text-base font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Email address
                </th>
                <th scope="col" className="px-12 py-3.5 text-base font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Role
                </th>
                <th scope="col" className="relative py-3.5 px-4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              {users.slice(startIndex, endIndex).map((user) => (
                <tr key={user?.id}>
                  <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center gap-x-3">
                      <h2 className="text-base font-normal text-gray-900">{user?.first_name} {user?.last_name}</h2>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-base text-gray-500 dark:text-gray-300 whitespace-nowrap">{user?.user_name}</td>
                  <td className="px-4 py-4 text-base text-gray-500 dark:text-gray-300 whitespace-nowrap">{user?.email}</td>
                  <td className="px-12 py-4 text-base font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      <h2 className="text-base font-normal text-emerald-500">{user?.role}</h2>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-base whitespace-nowrap">
                    <div className="flex items-center gap-x-6">
                      <Link to={`/users/update/${user._id}`} className="bg-dark text-white font-bold py-1 px-4 rounded m-3">
                        Update
                      </Link>
                      <button onClick={() => blockOrUnblock(user._id)} className="bg-dark text-white font-bold py-1 px-4 rounded m-3">
                        block/unblock
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
