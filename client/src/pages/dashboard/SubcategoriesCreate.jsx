import { useEffect, useState } from 'react';
import Sidebar from '../../layout/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthAxios from '../../helpers/request';
import { createSubcategory } from '../../app/subcategorySlice';
import { getAllCategories } from '../../app/categorySlice';

function SubcategoriesCreate() {
    const [subcategory_name, setsubcategory_name] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [active, setActive] = useState(false);
    const [categories, setCategories] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch categories from the backend
        const fetchCategories = async () => {
            try {
                const response = await AuthAxios.get('http://localhost:8000/v1/categories');
                setCategories(response.data.docs);
            } catch (error) {
                console.log('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!subcategory_name || !categoryId) {
            alert('Subcategory Name and Category are required.');
            return;
        }

        AuthAxios.post('http://localhost:8000/v1/subcategories/add', {
            subcategory_name,
            category: categoryId,
            active,
        })
            .then((response) => {
                if (!response.data) {
                    console.log('Error creating subcategory');
                    return;
                }
                dispatch(createSubcategory(response.data.docs));
                console.log(response.data);
                navigate('/subcategories');
            })
            .catch((error) => {
                if (error.isAxiosError && error.response) {
                    console.log('Error response:', error.response.data);
                } else {
                    console.error('Error:', error.message);
                }
            });
    };

    return (
        <div className="flex bg-gray-300">
            <div>
                <Sidebar />
            </div>
            <div className="m-3 flex-1 p-10">
                <h1 className="text-xl text-gray-900 font-semibold">
                    Create Subcategory
                </h1>
                <div className="-mx-4 -my-2  overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className=" inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="mt-8 overflow-hidden bg-white border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <form onSubmit={handleSubmit} className="p-5">
                                <div className="gap-6 mt-4 sm:grid-cols-2">
                                    <div className="flex flex-col">
                                        <label
                                            className="text-gray-700 dark:text-gray-200"
                                            htmlFor="subcategory_name"
                                        >
                                            Subcategory Name
                                        </label>
                                        <input
                                            id="subcategory_name"
                                            type="text"
                                            placeholder="Subcategory Name"
                                            className="block w-full mb-6 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            value={subcategory_name}
                                            onChange={(e) =>
                                                setsubcategory_name(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label
                                            className="text-gray-700 dark:text-gray-200"
                                            htmlFor="category"
                                        >
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            className="mt-2 mb-6 block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            value={categoryId}
                                            onChange={(e) =>
                                                setCategoryId(e.target.value)
                                            }
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.category_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label
                                            className="text-gray-700 dark:text-gray-200"
                                            htmlFor="active"
                                        >
                                            Subcategory Status
                                        </label>
                                        <select
                                            id="active"
                                            className="mt-2 block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            value={active ? 'true' : 'false'}
                                            onChange={(e) =>
                                                setActive(
                                                    e.target.value === 'true'
                                                )
                                            }
                                        >
                                            <option value="false">Select Status</option>
                                            <option value="false">Inactive </option>
                                            <option value="true">Active</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6 space-x-2">
                                    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md  focus:outline-none focus:bg-gray-600">
                                        Save
                                    </button>
                                    <Link
                                        to="/subcategories"
                                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md  focus:outline-none focus:bg-gray-600"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubcategoriesCreate;
