import React, { useState } from 'react'
import Sidebar from '../../layout/Sidebar'
import AuthAxios from '../../helpers/request';
import { createUser } from '../../app/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function UserCreate() {
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [user_name, setuser_name] = useState("");
    const [role, setrole] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const dispatsh = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthAxios
        .post("http://localhost:8000/v1/users/register", { first_name, last_name, user_name, email, password, role })
        .then((response) => {
            if (!response.data) {
                console.log("Error creating user");
            }
            dispatsh(createUser(response.data.docs));
            console.log(response.data);
            navigate("/users");
        })
        .catch((error) => {
            // Check if the error is an Axios error
            if (error.isAxiosError && error.response) {
                // Handle the error response
                console.log("Error response:", error.response.data);
                // You can show an error message to the user or handle the error in another way
            } else {
                // Handle other types of errors
                console.log("Error:", error.message);
            }
        });
    };
  
    return (
        <div className='flex bg-gray-300'>
            <div>
                <Sidebar />
            </div>
            <div className='m-3'>
                <h1 className="text-xl text-gray-900 font-semibold">Create User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="first_name">First Name</label>
                            <input 
                                id="first_name" 
                                type="text" 
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={(e) => setfirst_name(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="last_name">Last Name</label>
                            <input 
                                id="last_name" 
                                type="text" 
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={(e) => setlast_name(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="Username">Username</label>
                            <input 
                                id="Username" 
                                type="text" 
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={(e) => setuser_name(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col ">
                            <label className="text-gray-700 dark:text-gray-200">Role</label>
                            <div className="mt-4  flex flex-row gap-4">
                              <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="admin"
                                        className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                                        onChange={(e) => setrole("admin")}
                                    />
                                    
                                  Admin
                                </label>
                                </div>
                                <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="manager"
                                        className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                                        onChange={(e) => setrole("manager")}
                                    />
                                    Manger
                                </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="Email">Email</label>
                            <input 
                                id="Email" 
                                type="email" 
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                            <input 
                                id="password" 
                                type="password" 
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserCreate;
