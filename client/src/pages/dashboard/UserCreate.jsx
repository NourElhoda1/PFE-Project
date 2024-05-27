import React, { useState } from 'react';
import Sidebar from '../../layout/Sidebar';
import AuthAxios from '../../helpers/request';
import { createUser } from '../../app/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function UserCreate() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [user_name, setUserName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthAxios
            .post("http://localhost:8000/v1/users/register", { first_name, last_name, user_name, email, password, role })
           .then((response) => {
                if (!response.data) {
                    console.log("Error creating user");
                    return;
                }
                console.log({ first_name, last_name, user_name, email, password, role })
            
                dispatch(createUser(response.data.docs));
                console.log(response.data);
                navigate("/users");
            })
            .catch((error) => {
                console.error("Error creating user:", error);
                if (error.response) {
                    setError(error.response.data.message || "Error creating user");
                } else if (error.request) {
                     setError("No response received from server");
                } else {
                   setError("Error creating user");
                }
            });
    };

    return (
        <div className='flex bg-gray-300'>
            <div>
                <Sidebar />
            </div>
            <div className='m-3 flex-1 p-10'>
                <h1 className="text-2xl text-gray-900 font-semibold">Create User</h1>
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="mt-8 overflow-hidden bg-white border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <form onSubmit={handleSubmit} className='p-5'>
                                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                    <div className="flex flex-col">
                                        <label className="text-gray-700 dark:text-gray-200" htmlFor="first_name">First Name</label>
                                        <input 
                                            id="first_name" 
                                            type="text" 
                                            value={first_name}
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-gray-700 dark:text-gray-200" htmlFor="last_name">Last Name</label>
                                        <input 
                                            id="last_name" 
                                            type="text" 
                                            value={last_name}
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-gray-700 dark:text-gray-200" htmlFor="user_name">Username</label>
                                        <input 
                                            id="user_name" 
                                            type="text" 
                                            value={user_name}
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-gray-700 dark:text-gray-200">Role</label>
                                        <div className="mt-4 flex flex-row gap-4">
                                            <div>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="role"
                                                        value="admin"
                                                        className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                                                        onChange={(e) => setRole("admin")}
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
                                                        onChange={(e) => setRole("manager")}
                                                    />
                                                    Manager
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-gray-700 dark:text-gray-200" htmlFor="email">Email</label>
                                        <input 
                                            id="email" 
                                            type="email" 
                                            value={email}
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                                        <input 
                                            id="password" 
                                            type="password" 
                                            value={password}
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6 space-x-2">
                                    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md focus:outline-none focus:bg-gray-600">Save</button>
                                    <Link to="/users" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md focus:outline-none focus:bg-gray-600">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCreate;
