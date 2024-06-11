import React from 'react'
import Navbar from '../../layout/Navbar/Navbar'
import { Link } from 'react-router-dom'

function AdherentReclamation() {
  return (
    <div>
        <Navbar />
        <div className="flex items-center mt-4 mb-4 ml-16 gap-x-3">
              <Link to="/reclamation/add" className="bg-green-700 text-white font-bold py-1 px-5 rounded m-3">
                + Add
              </Link>
        </div>
    </div>
  )
}

export default AdherentReclamation