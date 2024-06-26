import React, { useState } from "react";
import { Link } from "react-router-dom";

const ServicesTable = ({ services }) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="py-3.5 px-8 text-base font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Name
                </th>
                <th scope="col" className="px-4 py-3.5 text-base font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Category
                </th>
                <th scope="col" className="py-3.5 px-12 text-base font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Subcategory
                </th>
                <th scope="col" className="py-3.5 px-12 text-base font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Seller
                </th>
                <th scope="col" className="py-3.5 px-12 text-base font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Price
                </th>
                <th scope="col" className="py-3.5 px-4 text-base font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Created at
                </th>
                <th scope="col" className="relative py-3.5 px-4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              {services.slice(startIndex, endIndex).map((service) => (
                <tr key={service?.id}>
                  <td className="px-8 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center gap-x-3">
                      <h2 className="text-base whitespace-normal font-semibold text-gray-900">{service?.service_name}</h2>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-base font-medium text-gray-700 whitespace-nowrap">{service?.category_name}</td>
                  <td className="px-12 py-4 text-base font-medium text-gray-700 whitespace-nowrap">{service?.subcategory_name}</td>
                  <td className="px-12 py-4 text-base font-medium text-gray-700 whitespace-nowrap">{service?.first_name} {service?.last_name}</td>
                  <td className="px-12 py-4 text-base font-medium text-gray-700 whitespace-nowrap">{service?.price}</td>
                  <td className="px-4 py-4 text-base font-medium text-gray-700 whitespace-nowrap">{formatDate(service?.created_at)}</td>
                  <td className="px-4 py-4 text-base whitespace-nowrap">
                    <div className="flex items-center gap-x-6">
                    <Link to={`/services/details/${service?.id}`} className="bg-primary text-white py-1 px-4 rounded m-3">
                        <div className="flex items-center gap-x-1">
                          Details
                        </div>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            
            </table>
            </div>

            <div className="flex justify-end   mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Previous
            </button>

            <div className="flex items-center ml-2">
            {[...Array(Math.ceil(services.length / itemsPerPage)).keys()].map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber + 1)}
                  className={`px-4 py-2 mr-2 text-sm font-medium border rounded-md hover:bg-gray-100 focus:outline-none ${
                    currentPage === pageNumber + 1
                      ? "bg-gray-200"
                      : "text-gray-500"
                  }`}
                >
                  {pageNumber + 1}
                </button>
              )
            )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(services.length / itemsPerPage)}
              className="flex items-center px-6 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Next
            </button>
            </div> 
          </div>
    </div>
  );
};

export default ServicesTable;
