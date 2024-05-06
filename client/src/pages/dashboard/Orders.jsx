import React, { useState, useEffect } from 'react'
import Sidebar from '../../layout/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { 
  ordersSelector,
  getAllOrders,
  isLoadingSelector 
} from '../../app/orderSlice';
import AuthAxios from '../../helpers/request';
import OrdersTable from '../../components/dashboard/OrdersTable';


function Orders() {

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
    <div className='flex bg-gray-300' >
    <div>
      <Sidebar />
    </div>
    <div className='flex-1 p-10'>
      <h1 className=" text-2xl text-gray-900 font-semibold">All Orders</h1>
      <section className="container px-4 mx-auto">
       
        <div className="flex flex-col">
          {!isLoading ? (
            <div className="flex flex-col mt-6">
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
  )
}

export default Orders