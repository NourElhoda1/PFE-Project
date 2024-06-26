import React, { useEffect, useState } from 'react'
import Sidebar from '../../layout/Sidebar'
import AuthAxios from '../../helpers/request';
import { 
    updateUser, 
    getUserById, 
    usersSelector, 
    isLoadingSelector 
} from '../../app/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';


function UserUpdate() {

    const { id } = useParams();
    const users = useSelector(usersSelector);
    const user = users.find(u => u.id === id);

    const [first_name, setfirst_name] = useState(user?.first_name);
    const [last_name, setlast_name] = useState(user?.last_name);
    const [user_name, setuser_name] = useState(user?.user_name);
    const [role, setrole] = useState(user?.role);
    const [email, setemail] = useState(user?.email);
    const [password, setpassword] = useState(user?.password);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(isLoadingSelector);

    useEffect(() => { 
        const fetchData = async () => {
            try {
                const response = await AuthAxios.get(`http://localhost:8000/v1/users`);
                if (!response.data) {
                    console.error("Error fetching user: userData is null");
                    return;
                }
                dispatch(getUserById(response.data.docs));
                console.log(id);
                console.log(isLoading)
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
    
        fetchData();
    }, [dispatch]);
    

    const handleUpdate = (e) => {
        e.preventDefault();
        AuthAxios.put(`http://localhost:8000/v1/users/${id}`, { first_name, last_name, user_name, role, email, password })
            .then((response) => {
                if (!response.data) {
                    console.log('Error updating user');
                }
                dispatch(updateUser({ id, first_name, last_name, user_name, role, email, password }));
                console.log({ first_name, last_name, user_name, role, email, password});
                navigate('/users');
            })
            .catch((error) => {
                console.error('Error updating user:', error.message);
            });
    };

    

    return (
        <div className='flex bg-gray-300'>
            <div>
                <Sidebar />
            </div>
            <div className='m-3 flex-1 p-10'>
                <h1 className="text-2xl text-gray-900 font-semibold"> Update User</h1>
                <div className="-mx-4 -my-2  overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className=" inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="mt-8 overflow-hidden bg-white border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <form onSubmit={handleUpdate} className='p-5'>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="first_name">First Name</label>
                            <input 
                                id="first_name" 
                                type="text" 
                                value={first_name}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={(e) => setfirst_name(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="last_name">Last Name</label>
                            <input 
                                id="last_name" 
                                type="text" 
                                value={last_name}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={(e) => setlast_name(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="Username">Username</label>
                            <input 
                                id="Username" 
                                type="text" 
                                value={user_name}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={(e) => setuser_name(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col ">
                            <label className="text-gray-700 dark:text-gray-200">Role</label>
                            <div className="mt-4  flex flex-row gap-4">
                              <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value={"admin"}
                                        className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                                        onChange={(e) => setrole("admin")}
                                    />
                                    
                                  Admin
                                </label>
                                </div>
                                <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value={"manager"}
                                        className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                                        onChange={(e) => setrole("manager")}
                                    />
                                    Manger
                                </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="Email">Email</label>
                            <input 
                                id="Email" 
                                type="email" 
                                value={email}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                            <input 
                                id="password" 
                                type="password" 
                                value={password}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </div>
                    </div>

                          <div className="flex justify-end mt-6 space-x-2">
                                <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md  focus:outline-none focus:bg-gray-600">Save</button>
                                <Link to="/users" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md  focus:outline-none focus:bg-gray-600">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
             </div>
        </div>

    </div>

  
);
}
export default UserUpdate ;