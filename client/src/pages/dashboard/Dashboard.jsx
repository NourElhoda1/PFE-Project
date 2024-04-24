import React from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../layout/Sidebar';


function Dashboard() {

  return (
    <div className='flex' >
      <div>
       <Sidebar />
      </div>
      <div className='m-3'>
       <h1 className=" text-xl text-gray-900 font-semibold">Dashboard</h1>
        
      </div>

       
    </div>
  )
}

export default Dashboard