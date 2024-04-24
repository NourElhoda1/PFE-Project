import React from 'react'
import Sidebar from '../../layout/Sidebar'

function Orders() {
  return (
    <div className='flex' >
    <div>
      <Sidebar />
    </div>
    <div className='m-3'>
      <h1 className=" text-xl text-gray-900 font-semibold">Orders</h1>
      
    </div>
  </div>
  )
}

export default Orders