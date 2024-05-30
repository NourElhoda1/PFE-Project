import React, { useEffect } from 'react';
import CategoryCard from './CategoryCard';
import { useDispatch, useSelector } from 'react-redux';
import { 
  categoriesSelector, 
  getAllCategories, 
  isLoadingSelector } from '../../../app/categorySlice';
import AuthAxios from '../../../helpers/request';

const Category = () => {

  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAxios.get("http://localhost:8000/v1/categories");
        if (!response.data) {
          console.log("Error fetching categories");
          return;
        }

        dispatch(getAllCategories(response.data.docs));
        console.log(isLoading);
      } catch (err) {
        console.log("Error fetching catgories:", err);
      } 
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto lg:flex-row lg:items-start lg:space-x-8">
        <div className=" text-center lg:text-left">
           <h5 className="text-lg font-semibold ml-10 mb-2 text-green-500">Explore services</h5>
           <h2 className="text-3xl font-bold text-dark mb-8 sm:text-4xl ml-10 ">Browse talent by category</h2>
        </div>
            <div className="grid grid-cols-1   sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
                {categories.map((category) => (
                <CategoryCard 
                  key={category.id} 
                  title={category.category_name}
                    />
                ))}
            </div>
       </div>
    </div>
  );
};

export default Category;
