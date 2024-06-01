import React, { useEffect, useState } from 'react';
import Sidebar from '../../layout/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import AuthAxios from '../../helpers/request';
import {  
    isLoadingSelector, 
    adherentsSelector,
    getAdherentById,
    updateAdherent
} from '../../app/adherentSlice';
import { Link } from 'react-router-dom';

function AdherentsUpdate() {

    const { id } = useParams();
    const adherents = useSelector(adherentsSelector);
    const adherent = adherents.find(c => c.id === id);

    const [first_name, setfirst_name] = useState(adherent?.first_name);
    const [last_name, setlast_name] = useState(adherent?.last_name);
    const [email, setemail] = useState(adherent?.email);
    const [password, setpassword] = useState(adherent?.password);
    const [valid_account, setvalid_account] = useState(adherent?.valid_account);
    const [active, setactive] = useState(adherent?.active);
    const [number, setnumber] = useState(adherent?.number);
    const [country, setcountry] = useState(adherent?.country);
    const [city, setcity] = useState(adherent?.city);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(isLoadingSelector);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await AuthAxios.get("http://localhost:8000/v1/adherents");
            if (!response.data) {
              console.log("Error fetching categories");
              return;
            }
    
            dispatch(getAdherentById(response.data.docs));
            console.log(isLoading);
            console.log(id);
          } catch (err) {
            console.log("Error fetching catgories:", err);
          }
        };
        fetchData();
      }, [dispatch]);  

    const handleUpdate = (e) => {
        e.preventDefault();
        AuthAxios.put(`http://localhost:8000/v1/adherents/${id}`, { first_name, last_name, email, password, valid_account, active, number, country, city })
            .then((response) => {
                if (!response.data) {
                    console.log('Error updating adherent');
                }
                dispatch(updateAdherent({ id, first_name, last_name, email, password, valid_account, active, number, country, city }));
                console.log({ id, first_name, last_name, email,password, valid_account, active, number, country, city });
                navigate("/adherents");
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
            <h1 className="text-2xl text-gray-900 font-semibold"> Edit Adherent</h1>
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
                                        placeholder="Enter your First Name"
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
                                        placeholder="Enter your Last Name"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        onChange={(e) => setlast_name(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="Email">Email</label>
                                    <input 
                                        id="Email" 
                                        type="email" 
                                        value={email}
                                        placeholder="Enter your Email"
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
                                        placeholder="Enter your password"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        onChange={(e) => setpassword(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="Number">Number</label>
                                    <input 
                                        id="Number" 
                                        type="tel" 
                                        value={number}
                                        placeholder="Enter your phone number" 
                                        // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"    
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        onChange={(e) => setnumber(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="Country">Country</label>
                                    <input 
                                        id="Country" 
                                        type="text" 
                                        value={country}
                                        placeholder="Enter your Country"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        onChange={(e) => setcountry(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="City">City</label>
                                    <input 
                                        id="City" 
                                        type="text" 
                                        value={city}
                                        placeholder="Enter your City"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        onChange={(e) => setcity(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                        <label className="text-gray-700 dark:text-gray-200" htmlFor="active">Activation</label>
                                        <select
                                            id="active"
                                            className="mt-2 block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            value={active ? 'true' : 'false'}
                                            onChange={(e) => setactive(e.target.value === 'true')}
                                        >
                                            <option value={true}>Active</option>
                                            <option value={false}>Inactive</option>
                                        </select>
                                </div>
                    
                                <div className="flex flex-col">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="valid_account">Validation</label>
                                    <select
                                        id="valid_account"
                                        className="mt-2 block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        value={valid_account ? 'true' : 'false'}
                                        onChange={(e) => setvalid_account(e.target.value === 'true')}
                                    >
                                        <option value={true}>Valid</option>
                                        <option value={false}>Invalid</option>
                                    </select>
                                </div>
                    
                                
                            </div>

                            <div className="flex justify-end mt-6 space-x-2">
                                <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md  focus:outline-none focus:bg-gray-600">Save</button>
                                <Link to="/adherents" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-primary rounded-md  focus:outline-none focus:bg-gray-600">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
);
}

export default AdherentsUpdate