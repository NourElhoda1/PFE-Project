import React, { useState, useEffect } from "react";
import Sidebar from "../../layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, isLoadingSelector, usersSelector } from "../../app/userSlice";
import AuthAxios from "../../helpers/request";
import { Link } from "react-router-dom";

function Users() {
  const dispatsh = useDispatch();
  const users = useSelector(usersSelector);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAxios.get("http://localhost:8000/v1/users");

        if (!response.data) {
          console.log("Error fetching users");
        }

        dispatsh(getAllUsers(response.data.docs));
        console.log(isLoading);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const blockOrUnblock = ( id ) => {
    AuthAxios.put(`http://localhost:4000/v1/users/block-unblock/${id}`)
    .then(response => {
        dispatch(refreshUser(response.data.blockOrUnblock)) ;
    }).catch(error => console.log(error)) ;
}
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="m-3">
        <h1 className=" text-xl text-gray-900 font-semibold">Users</h1>

        <Link to="/users/create" className="bg-dark text-white font-bold py-1 px-4 rounded m-3">
          + Add
        </Link>

        {!isLoading ? (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">UserName</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">details</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td className="p-3">{user._id}</td>
                    <td className="p-3">{user.first_name}</td>
                    <td className="p-3">{user.last_name}</td>
                    <td className="p-3">{user.user_name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">
                      <div className="flex">
                      <Link to="/users/update/${user._id}" className="bg-dark text-white font-bold py-1 px-4 rounded m-3">
                        Update
                      </Link>
                      <button onClick={() => blockOrUnblock(user._id)} className="bg-dark text-white font-bold py-1 px-4 rounded m-3">
                        block
                      </button>

                      
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
    </div>
  );
}

export default Users;
