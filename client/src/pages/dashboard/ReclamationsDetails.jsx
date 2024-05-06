import React, { useEffect, useState } from 'react';
import Sidebar from '../../layout/Sidebar';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getAllReclamations, 
    isLoadingSelector, 
    reclamationsSelector 
} from '../../app/reclamationSlice';
import AuthAxios from '../../helpers/request';

function ReclamationsDetails() {

    const { id } = useParams();
    const reclamations = useSelector(reclamationsSelector);
    const reclamation = reclamations.find(c => c.id === id) || {};

    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingSelector);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await AuthAxios.get("http://localhost:8000/v1/reclamations");
            if (!response.data) {
              console.log("Error fetching reclamations");
              return;
            }
    
            dispatch(getAllReclamations(response.data.docs));
            console.log(isLoading);
            console.log(id);
          } catch (err) {
            console.log("Error fetching reclamations:", err);
          }
        };
        fetchData();
      }, [dispatch, id, isLoading]);

    return (
      <div className='flex bg-gray-300' >
      <div>
      <Sidebar />
      </div>
      <div className='flex-1 p-10'>
          <h1 className=" text-2xl text-gray-900 font-semibold">Reclamation Details</h1>
          <div className="-mx-4 -my-2  overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className=" inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="mt-8 px-6 py-6 overflow-hidden bg-white border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <header>
                    <h2 class="text-gray-700 dark:text-gray-200">{reclamation.buyer}</h2>
                    <h5>{reclamation.service}</h5>
                  </header>
                  <div className='mt-6 border-t border-gray-300 dark:border-gray-700'>
                  </div>

                  <main class="mt-4">
                      <h2 class="text-gray-900 text-2xl font-semibold dark:text-gray-200">{reclamation.name}</h2>      
                      <p class="mt-5 text-gray-600 text-2xl dark:text-gray-300">{reclamation.description}</p>
                  </main>
                  </div>
              </div>
          </div>
      </div>
</div>
            





      )
}

export default ReclamationsDetails;
