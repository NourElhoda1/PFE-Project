import React, { useEffect } from 'react'
import Sidebar from '../../layout/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { getAllAdherents, isLoadingSelector, adherentsSelector } from '../../app/adherentSlice';
import AuthAxios from '../../helpers/request';
import { Link } from 'react-router-dom';

function Adherent() {
  const dispatsh = useDispatch();
  const adherents = useSelector(adherentsSelector);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAxios.get("http://localhost:8000/v1/adherents");
        if (!response.data) {
          console.log("Error fetching adherents");
        }

        dispatsh(getAllAdherents(response.data.docs));
        console.log(isLoading);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  })
  return (
    <div className='flex' >
      <div>
        <Sidebar />
      </div>
      <div className='m-3'>
        <h1 className=" text-xl text-gray-900 font-semibold">Adherents</h1>
        
        {!isLoading ? (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Action</th>
                <th className="p-3">details</th>
              </tr>
            </thead>
            <tbody>
              {adherents.map((adherent) => {
                return (
                  <tr key={adherent.id}>
                    <td className="p-3">{adherent._id}</td>
                    <td className="p-3">{adherent.first_name}</td>
                    <td className="p-3">{adherent.last_name}</td>
                    <td className="p-3">{adherent.email}</td>
                    <td className="p-3">{adherent.active ? 'Active' : 'Inactive'}</td>
                    <td className="p-3">
                      <div className="flex">
                      <button  className="bg-dark text-white font-bold py-1 px-4 rounded m-3">
                        block
                      </button>

                      
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
    </div>
  );
}
export default Adherent