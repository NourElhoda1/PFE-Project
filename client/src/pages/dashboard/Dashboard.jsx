import React, { useEffect, useState } from 'react';
import Sidebar from '../../layout/Sidebar';
import DashboardStats from '../../components/dashboard/DashboardStats';
import BarChart from '../../components/dashboard/chart/BarChart';
import LineChart from '../../components/dashboard/chart/LineChart';
import ServicesTable from '../../components/dashboard/ServicesTable';
import { useDispatch, useSelector } from 'react-redux';
import { 
  servicesSelector,
  isLoadingSelector,
  getAllServices
} from '../../app/serviceSlice';
import AuthAxios from '../../helpers/request';

const Dashboard = () => {

  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const services = useSelector(servicesSelector);

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
    <div className='flex bg-gray-300 h-screen '>
      <div>
        <Sidebar />
      </div>
      <div className='flex-1 p-5 ml-6 pt-10 overflow-auto'>
        <h1 className="text-2xl text-gray-900 font-semibold mb-5">Dashboard</h1>
        <section className='container px-2 mx-auto'>

          <div className="flex items-center  mt-6 gap-x-3">
            <DashboardStats />
          </div>

          <div className="flex  space-x-6 pt-8 pr-20">
            
            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Active Adherents</h2>
              <BarChart />
              <p className="mt-4 text-gray-600">Active Adherents <span className="text-green-500">(+23%)</span> than last week</p>
              <div className="flex justify-around mt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Adherents</p>
                  <p className="text-lg font-semibold">30</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Services</p>
                  <p className="text-lg font-semibold">40</p>
                </div>
                <div className="text-center">
                 
                </div>
                <div className="text-center">
                
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">visitor Overview</h2>
              <p className="mb-4 text-gray-600"><span className="text-green-500">4% more</span> in 2024</p>
              <LineChart />
            </div>
          </div>

          <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mt-6 pr-20">Services</h2>
          {!isLoading ? (
              <div className="flex flex-col mt-6 pr-20">
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
  );
};

export default Dashboard;
