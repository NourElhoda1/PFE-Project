import { useEffect, useState } from 'react';
import Sidebar from '../../layout/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import AuthAxios from '../../helpers/request';
import {
    updateSubcategory,
    isLoadingSelector,
    subcategoriesSelector,
    getSubcategoryById,
} from '../../app/subcategorySlice';
import { Link } from 'react-router-dom';

function SubcategoriesUpdate() {
    const { id } = useParams();
    const subcategories = useSelector(subcategoriesSelector);
    const subcategory = subcategories.find((c) => c.id === id);

    const [subcategory_name, setsubcategory_name] = useState(
        subcategory?.subcategory_name
    );
    const [category_name, setcategory_name] = useState(
        subcategory?.category_name
    );
    const [active, setactive] = useState(subcategory?.active);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(isLoadingSelector);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AuthAxios.get(
                    'http://localhost:8000/v1/subcategories'
                );
                if (!response.data) {
                    console.log('Error fetching subcategories');
                    return;
                }

                dispatch(getSubcategoryById(response.data.docs));
                console.log(isLoading);
                console.log(id);
            } catch (err) {
                console.log('Error fetching subcategories:', err);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleUpdate = (e) => {
        e.preventDefault();
        AuthAxios.put(`/v1/subcategories/` + id, {
            subcategory_name,
            category_name,
            active,
        })
            .then((response) => {
                console.log('response: ', response);
                if (!response.data) {
                    console.log('Error updating subcategory');
                }
                dispatch(
                    updateSubcategory({
                        id,
                        subcategory_name,
                        category_name,
                        active,
                    })
                );
                navigate('/subcategories');
            })
            .catch((error) => {
                console.error('Error updating subcategory:', error.message);
            });
    };

    return (
        <div className="flex bg-gray-300">
            <div>
                <Sidebar />
            </div>
            <div className="m-3 flex-1 p-10">
                <h1 className="text-xl text-gray-900 font-semibold">
                    Update Subcategory
                </h1>
                <div className="-mx-4 -my-2  overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className=" inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="mt-8 overflow-hidden bg-white border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <form onSubmit={handleUpdate} className="p-5">
                                <div className=" gap-6 mt-4 sm:grid-cols-2">
                                    <div className="flex flex-col">
                                        <label
                                            className="text-gray-700 dark:text-gray-200"
                                            htmlFor="category_name"
                                        >
                                            Subcategory Name
                                        </label>
                                        <input
                                            id="subcategory_name"
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            value={subcategory_name}
                                            onChange={(e) =>
                                                setsubcategory_name(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col mt-4">
                                        <label
                                            className="text-gray-700 dark:text-gray-200"
                                            htmlFor="category_name"
                                        >
                                            Category Name
                                        </label>
                                        <input
                                            id="category_name"
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            value={category_name}
                                            onChange={(e) =>
                                                setcategory_name(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col mt-4">
                                        <label
                                            className="text-gray-700 dark:text-gray-200"
                                            htmlFor="active"
                                        >
                                            Category Status
                                        </label>
                                        <select
                                            id="active"
                                            className="mt-2 block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            value={active ? 'true' : 'false'}
                                            onChange={(e) =>
                                                setactive(
                                                    e.target.value === 'true'
                                                )
                                            }
                                        >
                                            <option value={true}>Active</option>
                                            <option value={false}>
                                                Inactive
                                            </option>
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

export default SubcategoriesUpdate;
