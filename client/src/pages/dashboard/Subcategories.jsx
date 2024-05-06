// // eslint-disable-next-line no-unused-vars
// import React ,{useEffect} from 'react'
// import Sidebar from '../../layout/Sidebar'
// // eslint-disable-next-line no-unused-vars
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import AuthAxios from '../../helpers/request';
// import { getAllSubcategories, isLoadingSelector, subcategoriesSelector } from "../../app/subcategorySlice";

// function Subcategories() {
//   const dispatch = useDispatch();
//   const subcategories = useSelector(subcategoriesSelector);
//   const isLoading = useSelector(isLoadingSelector);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await AuthAxios.get("http://localhost:8000/v1/subcategories");
//         if (!response.data) {
//           console.log("Error fetching subcategories");
//         }

//         dispatch(getAllSubcategories(response.data.docs));
//         console.log(isLoading);

//       } catch (err) {
//         console.log("Error fetching subcatgories:",err);
//       }

//     };
//     fetchData();
//   },[dispatch]);
//   return (
//     <div className='flex' >
//     <div>
//       <Sidebar />
//     </div>
//     <div className='m-3'>
//       <h1 className=" text-xl text-gray-900 font-semibold">Subcategories</h1>

//       <Link to="/subcategories/create" className="bg-dark text-white font-bold py-1 px-4 rounded m-3">
//         + Add
//       </Link>

//       {!isLoading ? (
//         <table className="table-auto w-full">
//           <thead>
//             <tr>
//               <th className="p-3">#</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">CategoryId</th>
//               <th className="p-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//               {subcategories.map((subcategory) => {
//                 return(
//                 <tr key={subcategory?.id}>
//                   <td className="p-3">{subcategory?._id}</td>
//                   <td className="p-3">{subcategory?.subcategory_name}</td>
//                   <td className="p-3">{subcategory?.categoryId}</td>
//                   <td className="p-3">{subcategory?.active ? 'Active' : 'Inactive'}</td>
//                   <td className="p-3">
//                     <div className="flex">
//                       <button className="bg-dark text-white font-bold py-1 px-4 rounded m-3">
//                         Update
//                       </button>
//                       <button className="bg-dark text-white font-bold py-1 px-4 rounded m-3">
//                         Block
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//             </tbody>
//         </table>
//       ) : (
//         <p>Loading...</p>
//       )}

//     </div>
//   </div>
//   )
// }

// export default Subcategories

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthAxios from "../../helpers/request";
import {
  getAllSubcategories,
  isLoadingSelector,
  subcategoriesSelector,
} from "../../app/subcategorySlice";

function Subcategories() {
  const dispatch = useDispatch();
  const subcategories = useSelector(subcategoriesSelector);
  const isLoading = useSelector(isLoadingSelector);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAxios.get(
          "http://localhost:8000/v1/subcategories"
        );
        if (!response.data) {
          setError("Error fetching subcategories: No data returned");
          return;
        }
        dispatch(getAllSubcategories(response.data.docs));

        console.log(response.data.docs);
      } catch (err) {
        setError("Error fetching subcategories: " + err.message);
      }
    };

    fetchData();
  }, [dispatch]);
  //console.log(subcategories);
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="m-3">
        <h1 className="text-xl text-gray-900 font-semibold">Subcategories</h1>

        <Link
          to="/subcategories/create"
          className="bg-dark text-white font-bold py-1 px-4 rounded m-3"
        >
          + Add
        </Link>

        {error && <p>{error}</p>}

        {!isLoading && !error && (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">CategoryId</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            {subcategories && (
              <tbody>
                {subcategories.map((subcategory, index) => (
                  <tr key={index}>
                    <td className="p-3">{subcategory?._id}</td>
                    <td className="p-3">{subcategory?.subcategory_name}</td>
                    <td className="p-3">{subcategory?.categoryId}</td>
                    <td className="p-3">
                      {subcategory?.active ? "Active" : "Inactive"}
                    </td>
                    <td className="p-3">
                      <div className="flex">
                        <button className="bg-dark text-white font-bold py-1 px-4 rounded m-3">
                          Update
                        </button>
                        <button className="bg-dark text-white font-bold py-1 px-4 rounded m-3">
                          Block
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}

        {isLoading && !error && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default Subcategoriesg


