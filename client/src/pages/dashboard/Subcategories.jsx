import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../layout/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { 
  getAllSubcategories,
  isLoadingSelector,
  subcategoriesSelector
} from '../../app/subcategorySlice';
import AuthAxios from '../../helpers/request';
import SubcategoriesTable from '../../components/dashboard/SubcategoriesTable';

function Subcategories() {

  const dispatch = useDispatch();
  const subcategories = useSelector(subcategoriesSelector);
  const isLoading = useSelector(isLoadingSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAxios.get("http://localhost:8000/v1/subcategories");
        if (!response.data) {
          console.log("Error fetching subcategories");
          return;
        }

        dispatch(getAllSubcategories(response.data.docs));
        console.log(isLoading);
      } catch (err) {
        console.log("Error fetching subcategories:", err);
      } 
    };
    fetchData();
  }, [dispatch, currentPage]);

  return (
    <div className="flex bg-gray-300">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1  p-5 pt-10">
        <h1 className="text-2xl text-gray-900 font-semibold px-5">All Subcategories</h1>
        <section className="container px-6 mx-auto">
          <div className="flex items-center  mt-6 gap-x-3">
            <Link to="/subcategories/create" className="bg-primary text-white font-bold py-1 px-5 rounded m-3">
              + Add
            </Link>
          </div>
          <div className="flex flex-col">
            {!isLoading ? (
              <div className="flex flex-col mt-6 pr-20">
                <SubcategoriesTable 
                  subcategories={subcategories}
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
  )
}

export default Subcategories
