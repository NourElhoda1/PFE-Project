import React, { useState, useEffect } from "react";
import Sidebar from "../../layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { 
  getAllUsers,
  isLoadingSelector, 
  usersSelector, 
  deleteUserSuccess,
  deleteUserFailure
} from "../../app/userSlice";
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


  const deleteCategory = ({ id }) => async dispatch => {
    try {
      await AuthAxios.delete(`http://localhost:8000/v1/categories/${id}`);
      dispatch(deleteUserSuccess(id));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleDelete = (id) =>{
    dispatch(deleteCategory({id:id}));
  }


  return (
    <div className="flex bg-gray-300">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 p-10">
        <h1 className="text-2xl text-gray-900 font-semibold px-5">All Users</h1>
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
                  handleDelete={handleDelete} 
                  currentPage={currentPage} 
                  itemsPerPage={itemsPerPage} 
                />
              </div>
            ) : (
              <h1>Loading....</h1>
            )}
          </div>
         
        </section>
      </div>
    </div>
  );
}

export default Users;
