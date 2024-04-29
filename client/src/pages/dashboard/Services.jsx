import React, { useState, useEffect } from 'react'
import Sidebar from '../../layout/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { 
  servicesSelector,
  isLoadingSelector,
  getAllServices
} from '../../app/serviceSlice';
import AuthAxios from '../../helpers/request';
import { Link } from 'react-router-dom';
import ServicesTable from '../../components/dashboard/ServicesTable';

function Services() {

  const dispatch = useDispatch();
  const services = useSelector(servicesSelector);
  const isLoading = useSelector(isLoadingSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAxios.get(`http://localhost:8000/v1/services?page=${currentPage}`);
        if (!response.data) {
          console.log("Error fetching services");
        } 
        console.log(response.data);
        dispatch(getAllServices(response.data.docs));
        console.log(isLoading);
        console.log(services);
      } catch (err) {
        console.log(err);
      } 
    };
    fetchData();
  }, [currentPage, dispatch]);

  return (
    <div className='flex bg-gray-300' >
    <div>
      <Sidebar />
    </div>
    <div className='flex-1 p-10'>
      <h1 className=" text-2xl text-gray-900 font-semibold">All Services</h1>
      <section className="container px-4 mx-auto">
       
        <div className="flex flex-col">
          {!isLoading ? (
            <div className="flex flex-col mt-6">
              <ServicesTable
                services={services}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
            </div>
          ) : (
            <div className="flex flex-col mt-6">
              <p>Loading...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  </div>
  )
}

export default Services