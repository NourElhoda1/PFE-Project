import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthAxios from '../../helpers/request';
import { 
  getAllCategories, 
  categoriesSelector, 
  isLoadingSelector 
} from '../../app/categorySlice';
import { Link } from 'react-router-dom';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import Head from '../../layout/Navbar/Head'
import Category from '../../components/interface/landingpage/Category';

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);
  const isLoading = useSelector(isLoadingSelector);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAxios.get("http://localhost:8000/v1/categories");
        if (!response.data) {
          console.log("Error fetching categories");
          return;
        }
        dispatch(getAllCategories(response.data.docs));
      } catch (err) {
        console.log("Error fetching categories:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <nav >
    <div>
      <Head />
    </div>
    <div className="py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold">NEKHDEM MEAK</h1>
      <div className="hidden md:flex space-x-8 items-center">
        <Link to="/" className="text-black font-medium hover:text-green-700">Home</Link>
        <div className="relative group">
          <button className="text-black font-medium hover:text-green-700 focus:outline-none flex items-center">
            Category {isDropdownOpen ? <GoChevronUp className="ml-1" /> : <GoChevronDown className="ml-1" />}
          </button>
          <div className="absolute  top-full mt-2 w-[700px] bg-white border rounded-lg border-gray-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 grid grid-cols-3 gap-4 p-4">
            {categories.map((category) => (
              <Link to={`/category/${category.id}`} key={category.id} className="block rounded-md hover:bg-gray-200 p-2">
                {category.category_name}
              </Link>
            ))}
          </div>
        </div>
        <Link to="/about-us" className="text-black font-medium hover:text-green-700">About Us</Link>
        <Link to="/category" className="text-black font-medium hover:text-green-700">Explore</Link>
      </div>
      <div className="hidden md:flex space-x-4">
        <Link to="/login" className="bg-green-200 text-black font-medium hover:text-gray-700 px-4 py-2 rounded-xl hover:bg-success">Login</Link>
        <Link to="/register" className="bg-green-500 text-white font-medium px-4 py-2 rounded-xl hover:bg-green-600">Register Now</Link>
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col space-y-2 p-4">
            <Link to="/" className="text-black  hover:text-gray-700 ">Home</Link>
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-black hover:text-gray-700 focus:outline-none flex items-center mt-2 mb-2">
                Category {isDropdownOpen ? <GoChevronUp className="ml-1" /> : <GoChevronDown className="ml-1" />}
              </button>
              {isDropdownOpen && (
                <div className="mt-2 w-full bg-white border rounded-lg border-gray-200 shadow-lg grid grid-cols-1 gap-4 p-4">
                  {categories.map((category) => (
                    <Link to={`/category/${category.id}`} key={category.id} className="block rounded-md hover:bg-gray-200 p-2">
                      {category.category_name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/about-us" className="text-black pb-2 hover:text-gray-700">About Us</Link>
            <Link to="/category" className="text-black pb-2  hover:text-gray-700">Explore</Link>
            <Link to="/login" className="bg-green-200 text-black hover:text-gray-700 px-4 py-2 rounded-md hover:bg-green-300">Login</Link>
            <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Register Now</Link>
          </div>
        </div>
      )}
         </div>
    </nav>
 
  );
};

export default Navbar;
