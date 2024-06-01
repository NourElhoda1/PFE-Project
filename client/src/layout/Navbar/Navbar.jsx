import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { 
  getAllCategories, 
  categoriesSelector, 
  isLoadingSelector 
} from '../../app/categorySlice';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import Head from '../../layout/Navbar/Head';
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);
  const isLoading = useSelector(isLoadingSelector);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/v1/categories");
        dispatch(getAllCategories(response.data.docs));
      } catch (err) {
        console.log("Error fetching categories:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  const currentUser = Cookies.get('currentUser') ? JSON.parse(Cookies.get('currentUser')) : null;

  const handleLogout = () => {
    Cookies.remove('currentUser');
    navigate("/"); 
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  return (
    <nav>
      <div>
        <Head />
      </div>
      <div className="py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">NEKHDEM MEAK</h1>
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-black font-medium hover:text-green-700">Home</Link>
          <div className="relative">
            <button 
              className="text-black font-medium hover:text-green-700 focus:outline-none flex items-center"
              onClick={toggleCategoryDropdown}
              aria-label="Toggle Category Dropdown"
            >
              Category {isCategoryDropdownOpen ? <GoChevronUp className="ml-1" /> : <GoChevronDown className="ml-1" />}
            </button>
            {isCategoryDropdownOpen && (
              <div className="absolute top-full mt-2 w-[700px] bg-white border rounded-lg border-gray-200 shadow-lg grid grid-cols-3 gap-4 p-4">
                {categories.length ? categories.map((category) => (
                  <Link to={`/category/${category.id}`} key={category.id} className="block rounded-md hover:bg-gray-200 p-2">
                    {category.category_name}
                  </Link>
                )) : <p className="col-span-3 text-center">No categories available</p>}
              </div>
            )}
          </div>
          <Link to="/about-us" className="text-black font-medium hover:text-green-700">About Us</Link>
          <Link to="/category" className="text-black font-medium hover:text-green-700">Explore</Link>
        </div>
        {!currentUser ? (
          <div className="hidden md:flex space-x-4">
            <Link to="/login" className="bg-green-200 text-black font-medium hover:text-gray-700 px-4 py-2 rounded-xl hover:bg-success">Login</Link>
            <Link to="/register" className="bg-green-500 text-white font-medium px-4 py-2 rounded-xl hover:bg-green-600">Join Now</Link>
          </div>
        ) : (
          <div className="hidden md:flex space-x-4 items-center">
            <div className="relative">
              <button 
                className="text-black font-medium hover:text-green-700 focus:outline-none flex items-center"
                onClick={toggleProfileDropdown}
                aria-label="Toggle Profile Dropdown"
              >
                <FaRegUser size={20} /> {isProfileDropdownOpen ? <GoChevronUp className="ml-1" /> : <GoChevronDown className="ml-1" />}
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white border rounded-lg border-gray-200 shadow-lg p-4 w-48 ">
                  <Link to="/profile" className="block rounded-md hover:bg-gray-200 p-2 border-b border-gray-300">Profile</Link>
                  <Link to="/" className='block rounded-md hover:bg-gray-200 p-2'>Post a Service</Link>
                  <Link to="/orders" className="block rounded-md hover:bg-gray-200 p-2 ">Orders</Link>
                  <Link to=" /" className="block rounded-md hover:bg-gray-200 p-2 border-b border-gray-300">Message Center </Link>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left block rounded-md hover:bg-gray-200 p-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black focus:outline-none" aria-label="Toggle Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 w-full bg-white border-t border-gray-200 shadow-lg">
            <div className="flex flex-col space-y-2 p-4">
              <Link to="/" className="text-black hover:text-gray-700">Home</Link>
              <div className="relative">
                <button 
                  onClick={toggleCategoryDropdown} 
                  className="text-black hover:text-gray-700 focus:outline-none flex items-center mt-2 mb-2"
                  aria-label="Toggle Category Dropdown"
                >
                  Category {isCategoryDropdownOpen ? <GoChevronUp className="ml-1" /> : <GoChevronDown className="ml-1" />}
                </button>
                {isCategoryDropdownOpen && (
                  <div className="mt-2 w-full bg-white border rounded-lg border-gray-200 shadow-lg grid grid-cols-1 gap-4 p-4">
                    {categories.length ? categories.map((category) => (
                      <Link to={`/category/${category.id}`} key={category.id} className="block rounded-md hover:bg-gray-200 p-2">
                        {category.category_name}
                      </Link>
                    )) : <p className="text-center">No categories available</p>}
                  </div>
                )}
              </div>
              <Link to="/about-us" className="text-black pb-2 hover:text-gray-700">About Us</Link>
              <Link to="/category" className="text-black pb-2 hover:text-gray-700">Explore</Link>
              {!currentUser ? (
                <>
                  <Link to="/login" className="bg-green-200 text-black hover:text-gray-700 px-4 py-2 rounded-md hover:bg-green-300">Login</Link>
                  <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Join Now</Link>
                </>
              ) : (
                <div className="relative">
                  <button 
                    onClick={toggleProfileDropdown} 
                    className="text-black hover:text-gray-700 focus:outline-none flex items-center mt-2 mb-2"
                    aria-label="Toggle Profile Dropdown"
                  >
                    <FaRegUser size={20} /> {isProfileDropdownOpen ? <GoChevronUp className="ml-1" /> : <GoChevronDown className="ml-1" />}
                  </button>
                  {isProfileDropdownOpen && (
                    <div className="mt-2 w-full bg-white border rounded-lg border-gray-200 shadow-lg p-4">
                      <Link to="/profile" className="block rounded-md hover:bg-gray-200 p-2 border-b border-gray-300">Profile</Link>
                      <Link to="/" className='block rounded-md hover:bg-gray-200 p-2'>Post a Service</Link>
                      <Link to="/orders" className="block rounded-md hover:bg-gray-200 p-2 ">Orders</Link>
                      <Link to=" /" className="block rounded-md hover:bg-gray-200 p-2 border-b border-gray-300">Message Center </Link>
                      <button 
                        onClick={handleLogout} 
                        className="w-full text-left block rounded-md hover:bg-gray-200 p-2"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;