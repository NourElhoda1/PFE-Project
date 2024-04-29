import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { 
    getServicesById,
    isLoadingSelector, 
    servicesSelector 
} from '../../app/serviceSlice';
import AuthAxios from '../../helpers/request';
import Sidebar from '../../layout/Sidebar'

function ServiceDetails() {

    const {id} = useParams();
    const services = useSelector(servicesSelector);
    const service = services.find(s => s.id === id);

    const [service_name, setservice_name] = useState(service?.service_name);
    const [category_name, setcategory_name] = useState(service?.category_name);
    const [subcategory_name, setsubcategory_name] = useState(service?.subcategory_name);
    const [first_name, setfirst_name] = useState(service?.first_name);
    const [last_name, setlast_name] = useState(service?.last_name);
    const [images, setimages] = useState(service?.images);
    const [price, setprice] = useState(service?.price);
    const [short_description, setshort_description] = useState(service?.short_description);
    const [long_description, setlong_description] = useState(service?.long_description);
    const [created_at, setcreated_at] = useState(service?.created_at);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(isLoadingSelector);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await AuthAxios.get("http://localhost:8000/v1/services");
            if (!response.data) {
              console.log("Error fetching services");
              return;
            }
    
            dispatch(getServicesById(response.data.docs));
            console.log(isLoading);
            console.log(id);
          } catch (err) {
            console.log("Error fetching services:", err);
          }
        };
        fetchData();
      }, [dispatch]);
  return (
    <div className='flex bg-gray-300' >
        <div>
        <Sidebar />
        </div>
        <div className='flex-1 p-10'>
            <h1 className=" text-2xl text-gray-900 font-semibold">Service Details</h1>
            <div className="-mx-4 -my-2  overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className=" inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="mt-8 overflow-hidden bg-white border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    ssssssssss
                    </div>
                </div>
            </div>
        </div>
  </div>
  )
}

export default ServiceDetails