import React from 'react'
import Sidebar from '../../layout/Sidebar'

function Categories() {
  return (
    <div className='flex' >
    <div>
      <Sidebar />
    </div>
    <div className='m-3'>
      <h1 className=" text-xl text-gray-900 font-semibold">Categories</h1>
      
    </div>
  </div>
  )
}

export default Categories