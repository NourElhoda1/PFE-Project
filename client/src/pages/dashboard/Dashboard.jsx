import React, { useEffect, useState } from 'react';
import Sidebar from '../../layout/Sidebar';
import DashboardStats from '../../components/dashboard/DashboardStats';
import BarChart from '../../components/dashboard/chart/BarChart';
import LineChart from '../../components/dashboard/chart/LineChart';
import OrdersTable from '../../components/dashboard/OrdersTable';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getAllOrders,
  isLoadingSelector,
  ordersSelector
} from '../../app/orderSlice';
import AuthAxios from '../../helpers/request';

const Dashboard = () => {

  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const orders = useSelector(ordersSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAxios.get(`http://localhost:8000/v1/orders?page=${currentPage}`);
        if (!response.data) {
          console.log("Error fetching orders");
        } 
        console.log(response.data);
        dispatch(getAllOrders(response.data.docs));
        console.log(isLoading);
        console.log(orders);
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
                  <p className="text-lg font-semibold">200</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Services</p>
                  <p className="text-lg font-semibold">355</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Orders</p>
                  <p className="text-lg font-semibold">159</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Reclamations</p>
                  <p className="text-lg font-semibold">1</p>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Orders Overview</h2>
              <p className="mb-4 text-gray-600"><span className="text-green-500">4% more</span> in 2024</p>
              <LineChart />
            </div>
          </div>

          <div className="flex flex-col">
          {!isLoading ? (
            <div className="flex flex-col mt-6 pr-20">
              <OrdersTable 
                orders={orders}
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
