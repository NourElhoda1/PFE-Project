import AuthAxios from '../../helpers/request';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from '../../layout/Sidebar';

const ServiceDetails = () => {
  const { id: serviceId } = useParams(); // Destructure the id param and rename it to serviceId
  const [isLoading, setIsLoading] = useState(false);
  const [serviceDetails, setServiceDetails] = useState({
    service_name: '',
    categoryId: { category_name: '' },
    subcategoryId: { subcategory_name: '' },
    images: [],
    price: '',
    short_description: '',
    long_description: '',
    sellerId: { first_name: '', last_name: '' },
    created_at: '',
  });

  useEffect(() => {
    const fetchServiceDetails = async () => {
      setIsLoading(true);
      try {
        const response = await AuthAxios.get(`/v1/services/${serviceId}`);
        setServiceDetails(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching service details:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServiceDetails();
  }, [serviceId]);

  return (
    <div className='flex bg-gray-300'>
      <div>
        <Sidebar />
      </div>
     <div className="flex-1 p-5 pt-10">
        <h1 className="text-2xl text-gray-900 font-semibold px-5 mb-5">Service Details</h1>
      <div className="max-w-7xl mx-auto p-6  bg-white shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold mb-4">{serviceDetails.service_name}</h1>
        <div className="flex mb-6">
          <div className="w-1/2 flex flex-wrap">
            {serviceDetails.images && serviceDetails.images.length > 0 ? (
              serviceDetails.images.map((image, index) => (
                <img key={index} className="w-1/2 rounded-lg p-2" src={image} alt={`Service Image ${index + 1}`} />
              ))
            ) : (
              <img className="w-1/2 rounded-lg" src="/path-to-your-service-image.jpg" alt="Service" />
            )}
          </div>
          <div className="w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-4">{serviceDetails.sellerId.first_name} {serviceDetails.sellerId.last_name}</h2>
            <p className="text-lg mb-2">Price: {serviceDetails.price} MD</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Category: {serviceDetails.categoryId.category_name}</li>
              <li>Subcategory: {serviceDetails.subcategoryId.subcategory_name}</li>
            </ul>
            <p className="text-lg font-semibold mb-2">{moment(serviceDetails.created_at).format('MMMM DD, YYYY')}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded mb-2">Continue ({serviceDetails.price} MD)</button>
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Project details</h3>
          <p className="mb-4">{serviceDetails.short_description}</p>
          <p className="mb-4">{serviceDetails.long_description}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
