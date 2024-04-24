// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { getUser } from '../../app/userSlice';
// import Sidebar from '../../layout/Sidebar'

// function Users() {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000');
//                 dispatch(getUser(response.data));
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchData();
//     }, [dispatch]);

//     return (
//         <div>
//           <Sidebar />
//             <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
//                 + Add User
//             </button>
       
//             <table>
//                 <thead className='text-center text-xl'>
//                     <tr>
//                         <th>Id</th>
//                         <th>Name</th>
//                         <th>Username</th>
//                         <th>Role</th>
//                         <th>Email</th>
//                         <th>Details</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user.id}>
//                             <td>{user.id}</td>
//                             <td>{user.name}</td>
//                             <td>{user.username}</td>
//                             <td>{user.role}</td>
//                             <td>{user.email}</td>
//                             <td>
//                                 <button>Details</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default Users;


import React from 'react'
import Sidebar from '../../layout/Sidebar'

function Users() {
  return (
    <div className='flex' >
    <div>
      <Sidebar />
    </div>
    <div className='m-3'>
      <h1 className=" text-xl text-gray-900 font-semibold">Users</h1>
      
    </div>
  </div>
  )
}

export default Users
