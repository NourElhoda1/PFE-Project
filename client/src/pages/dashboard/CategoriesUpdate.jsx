import React, { useEffect, useState } from 'react';
import Sidebar from '../../layout/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import AuthAxios from '../../helpers/request';
import { 
    updateCategory, 
    isLoadingSelector, 
    categoriesSelector, 
    getCategoryById 
} from '../../app/categorySlice';
import { Link } from 'react-router-dom';

function CategoriesUpdate() {
    const { id } = useParams();
    const categories = useSelector(categoriesSelector);
    const category = categories.find(c => c.id === id);

    const [category_name, setcategory_name] = useState(category?.category_name);
    const [active, setactive] = useState(category?.active);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(isLoadingSelector);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AuthAxios.get("http://localhost:8000/v1/categories");
                if (!response.data) {
                    console.log("Error fetching categories");
                    return;
                }
                dispatch(getCategoryById(response.data.docs));
            } catch (err) {
                console.log("Error fetching categories:", err);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleUpdate = (e) => {
        e.preventDefault();
        AuthAxios.put(`http://localhost:8000/v1/categories/${id}`, { category_name, active })
            .then((response) => {
                if (!response.data) {
                    console.log('Error updating category');
                }
                dispatch(updateCategory({ id, category_name, active }));
                navigate("/categories");
            })
            .catch((error) => {
                console.error('Error updating category:', error.message);
            });
    };

    return (
        <div className='flex bg-gray-300'>
            <div>
                <Sidebar />
            </div>
            <div className='m-3 flex-1 p-10'>
                <h1 className="text-xl text-gray-900 font-semibold">Update Category</h1>
                <div className="-mx-4 -my-2  overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className=" inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="mt-8 overflow-hidden bg-white border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <form onSubmit={handleUpdate} className='p-5'>
                                <div className=" gap-6 mt-4 sm:grid-cols-2">
                                    <div className="flex flex-col">
                                        <label className="text-gray-700 dark:text-gray-200" htmlFor="category_name">Category Name</label>
                                        <input
                                            id="category_name"
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            value={category_name}
                                            onChange={(e) => setcategory_name(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-gray-700 dark:text-gray-200" htmlFor="active">Category Status</label>
                                        <select
                                            id="active"
                                            className="mt-2 block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            value={active ? 'true' : 'false'}
                                            onChange={(e) => setactive(e.target.value === 'true')}
                                        >
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6 space-x-2">
                                    <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md  focus:outline-none focus:bg-gray-600">Save</button>
                                    <Link to="/categories" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md  focus:outline-none focus:bg-gray-600">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoriesUpdate;
