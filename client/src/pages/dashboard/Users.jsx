import React, { useState, useEffect } from "react";
import Sidebar from "../../layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, isLoadingSelector, usersSelector } from "../../app/userSlice";
import AuthAxios from "../../helpers/request";
import { Link } from "react-router-dom";
import UserTable from '../../components/dashboard/UsersTable';

function Users() {
  const dispatch = useDispatch();
  const users = useSelector(usersSelector);
  const isLoading = useSelector(isLoadingSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAxios.get(`http://localhost:8000/v1/users?page=${currentPage}`);
  
        if (!response.data) {
          console.log("Error fetching users");
        }
  
        dispatch(getAllUsers(response.data.docs));
        console.log(isLoading);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentPage]);
  
  const blockOrUnblock = (id) => {
    AuthAxios.put(`http://localhost:4000/v1/users/block-unblock/${id}`)
      .then(response => {
        dispatch(refreshUser(response.data.blockOrUnblock));
      })
      .catch(error => console.log(error));
  }

  
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className="flex bg-gray-300">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 p-10">
        <h1 className="text-xl text-gray-900 font-semibold px-5">Users</h1>
        <section className="container px-4 mx-auto">
          <div className="flex items-center  mt-6 gap-x-3">
            <Link to="/users/create" className="bg-dark text-white font-bold py-1 px-5 rounded m-3">
              + Add
            </Link>
          </div>
          <div className="flex flex-col">
            {!isLoading ? (
              <div className="flex flex-col mt-6">
                <UserTable 
                  users={users} 
                  blockOrUnblock={blockOrUnblock} 
                  currentPage={currentPage} 
                  itemsPerPage={itemsPerPage} 
                />
              </div>
            ) : (
              <h1>Loading....</h1>
            )}
          </div>
          <div className="flex items-center justify-between mt-6">
            <button 
              onClick={handlePreviousPage} 
              disabled={currentPage === 1}
              className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
              <span>Previous</span>
            </button>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
              className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <span>Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Users;
