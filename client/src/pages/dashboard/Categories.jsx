import React, { useEffect } from 'react'
import Sidebar from '../../layout/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, isLoadingSelector, categoriesSelector } from '../../app/categorySlice';
import AuthAxios from '../../helpers/request';
import { Link } from 'react-router-dom';

function Categories() {
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
    <div className='flex' >
    <div>
      <Sidebar />
    </div>
    <div className='m-3'>
      <h1 className=" text-xl text-gray-900 font-semibold">Categories</h1>

      <Link to="/categories/create" className="bg-dark text-white font-bold py-1 px-4 rounded m-3">
        + Add
      </Link>

      {!isLoading ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
          {categories.map((category) => (
            <tr key={category?.id}> 
              <td className="p-3">{category?.id}</td> 
              <td className="p-3">{category?.category_name}</td>
              <td className="p-3">{category?.active ? 'Active' : 'Inactive'}</td>
              <td className="p-3">
                <div className="flex">
                  <Link to={`/categories/update/${category?.id}`} className="bg-dark text-white font-bold py-1 px-4 rounded m-3">
                    Update
                  </Link>
                  <button className="bg-dark text-white font-bold py-1 px-4 rounded m-3">
                    Block
                  </button>
                </div>
      </td>
  </tr>
))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}

      
    </div>
  </div>
  )
}

export default Categories