import React, { useState } from 'react';
import axios from 'axios';
import { createAdherent } from '../../app/adherentSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import myImage from '../../assets/register1.jpg';

function AdherentRegister() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/v1/adherents/register", { first_name, last_name, email, password, number, country, city })
            .then((response) => {
                if (!response.data) {
                    console.log("Error creating user");
                    return;
                }
                dispatch(createAdherent(response.data.docs));
                navigate("/login");
            })
            .catch((error) => {
                if (error.response && error.response.data.errors) {
                    const fieldErrors = error.response.data.errors.reduce((acc, err) => {
                        acc[err.path] = err.msg;
                        return acc;
                    }, {});
                    setErrors(fieldErrors);
                } else if (error.request) {
                    setErrors({ general: "No response received from server" });
                } else {
                    setErrors({ general: "Error creating adherent" });
                }
            });
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen">
            <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2">
                <img src={myImage} alt="Left side" className="w-full h-[45rem]" />
            </div>
            <div className="flex items-center justify-center w-full lg:w-1/2 bg-white p-6 sm:p-10">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl mb-2 font-bold text-green-600">Join Us</h1>
                    <p className="mb-4 text-green-550 text-2xl font-semibold">and Shape Your Future Today</p>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first_name" className="block font-medium text-lg text-gray-700">First Name</label>
                                <input 
                                    id="first_name" 
                                    type="text" 
                                    value={first_name} 
                                    placeholder="First Name"
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                {errors.first_name && <span className="text-red-500">{errors.first_name}</span>}
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block font-medium text-lg text-gray-700">Last Name</label>
                                <input 
                                    id="last_name" 
                                    type="text" 
                                    value={last_name} 
                                    placeholder="Last Name"
                                    onChange={(e) => setLastName(e.target.value)} 
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                {errors.last_name && <span className="text-red-500">{errors.last_name}</span>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block font-medium text-lg text-gray-700">Email</label>
                            <input 
                                id="email" 
                                    type="email" 
                                    value={email} 
                                    placeholder="Email Address"
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            {errors.email && <span className="text-red-500">{errors.email}</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block font-medium text-lg text-gray-700">Password</label>
                            <input 
                                id="password" 
                                    type="password" 
                                    value={password} 
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            {errors.password && <span className="text-red-500">{errors.password}</span>}
                        </div>
                        <div>
                            <label htmlFor="number" className="block font-medium text-lg text-gray-700">Phone Number</label>
                            <input 
                                id="number" 
                                    type="text" 
                                    value={number} 
                                    placeholder="Phone Number"
                                    onChange={(e) => setNumber(e.target.value)} 
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            {errors.number && <span className="text-red-500">{errors.number}</span>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="country" className="block font-medium text-lg text-gray-700">Country</label>
                                <input 
                                    id="country" 
                                    type="text" 
                                    value={country} 
                                    placeholder="Country"
                                    onChange={(e) => setCountry(e.target.value)} 
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                {errors.country && <span className="text-red-500">{errors.country}</span>}
                            </div>
                            <div>
                                <label htmlFor="city" className="block font-medium text-lg text-gray-700">City</label>
                                <input 
                                    id="city" 
                                    type="text" 
                                    value={city} 
                                    placeholder="City"
                                    onChange={(e) => setCity(e.target.value)} 
                                    className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                {errors.city && <span className="text-red-500">{errors.city}</span>}
                            </div>
                        </div>
                       
                        <div className="flex justify-end mt-4 space-x-2">
                            <button 
                                type="submit" 
                                className="block w-full bg-green-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                            >
                                Join Us
                            </button>
                        </div>
                        {errors.general && <span className="text-red-500">{errors.general}</span>}
                    </form>
                    <div className='text-center mb-2'>
                        <p>Already have an account? <Link to="/login" className="text-green-600 hover:text-green-800 transition-colors duration-300">Log in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdherentRegister;
