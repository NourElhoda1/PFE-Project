import React from 'react'
import Navbar from '../../layout/Navbar/Navbar'

function AddReclamation() {
  return (
    <div>
        <Navbar />
        <div className="flex-1 p-5 pt-10">
            <h1 className="text-2xl text-gray-900 font-semibold ml-7 px-5">Add Reclamation</h1>
            <section className="container px-6 mx-auto">
                <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <label for="reclamation_name " class="block text-sm font-medium leading-6 text-gray-900">
                        Title 
                        </label>
                        <div class="mt-2">
                        <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                            type="text"
                            name="reclamation_name"
                            id="reclamation_name"
                            class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Title"
                            />
                        </div>
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label for="about" class="block text-sm font-medium leading-6 text-gray-900">
                        Description
                        </label>
                        <div class="mt-2">
                        <textarea
                            id="about"
                            name="about"
                            rows="3"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Write a few sentences about yourself."
                        ></textarea>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                </section>
        </div>
    </div>
  )
}

export default AddReclamation