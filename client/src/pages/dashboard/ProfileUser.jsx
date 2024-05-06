import React from 'react'
import Sidebar from '../../layout/Sidebar'

function ProfileUser() {
  return (
    <div className='flex bg-gray-300' >
    <div>
    <Sidebar />
    </div>
    <div className='flex-1 p-10'>
        <h1 className=" text-2xl text-gray-900 font-semibold">Profile</h1>
        <div className="-mx-4 -my-2  overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className=" inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden bg-white border border-gray-200 dark:border-gray-700 md:rounded-lg">
                Overview
                
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default ProfileUser