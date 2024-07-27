import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import Home from '../pages/interface/Home';
import Dashboard from '../pages/dashboard/Dashboard';
import Adherents from '../pages/dashboard/Adherents';
import AdherentsUpdate from '../pages/dashboard/AdherentsUpdate';
import Users from '../pages/dashboard/Users';
import UserCreate from '../pages/dashboard/UserCreate';
import UserUpdate from '../pages/dashboard/UserUpdate';
import UserLogin from '../pages/dashboard/UserLogin';
import Categories from '../pages/dashboard/Categories';
import CatgoriesCreate from '../pages/dashboard/CatgoriesCreate';
import CategoriesUpdate from '../pages/dashboard/CategoriesUpdate';
import Subcategories from '../pages/dashboard/Subcategories';
import SubcategoriesCreate from '../pages/dashboard/SubcategoriesCreate';
import SubcategoriesUpdate from '../pages/dashboard/SubcategoriesUpdate';
import Services from '../pages/dashboard/Services';
import ServiceDetails from '../pages/dashboard/ServiceDetails';
import Orders from '../pages/dashboard/Orders';
import Reclamations from '../pages/dashboard/Reclamations';
import ReclamationsDetails from '../pages/dashboard/ReclamationsDetails';
import UserProfile from '../pages/dashboard/UserProfile';
import PageNotFound from '../pages/PageNotFound';
import ProtectedRouter from './ProtectedRouter';
import AdherentRegister from '../pages/interface/AdherentRegister';
import AdherentLogin from '../pages/interface/AdherentLogin';
import ChatApp from '../pages/interface/ChatApp';
import Profileeee from '../pages/interface/Profileeee';
import CategoriesListe from '../pages/interface/CategoriesListe';
import ServiceDetailsInterface from '../pages/interface/ServiceDetailsInterface';
import AdherentProfile from '../pages/interface/AdherentProfile';
import AdherentServices from '../pages/interface/AdherentServices';
import AdherentSettings from '../pages/interface/AdherentSettings';
import ServicesCreate from '../pages/interface/ServicesCreate';
import ForgetPassword from '../pages/interface/ForgetPassword'
// import AdherentReclamation from '../pages/interface/AdherentReclamation';
// import AddReclamation from '../pages/interface/AddReclamation';

const ConfigRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<ProtectedRouter />}>
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/users" element={<Users />} />
                <Route path="/users/create" element={<UserCreate />} />
                <Route path="/users/update/:id" element={<UserUpdate />} />

                <Route path="/categories" element={<Categories />} />
                <Route
                    path="/categories/create"
                    element={<CatgoriesCreate />}
                />
                <Route
                    path="/categories/update/:id"
                    element={<CategoriesUpdate />}
                />

                <Route path="/subcategories" element={<Subcategories />} />
                <Route
                    path="/subcategories/create"
                    element={<SubcategoriesCreate />}
                />
                <Route
                    path="/subcategories/update/:id"
                    element={<SubcategoriesUpdate />}
                />

                <Route path="/adherents" element={<Adherents />} />
                <Route
                    path="/adherents/update/:id"
                    element={<AdherentsUpdate />}
                />

                <Route path="/services" element={<Services />} />
                <Route
                    path="/services/details/:id"
                    element={<ServiceDetails />}
                />

                <Route path="orders" element={<Orders />} />

                <Route path="/reclamations" element={<Reclamations />} />
                <Route path="/reclamations/:id" element={<ReclamationsDetails />}/>

                <Route path="/profile" element={<UserProfile />} />
            </Route>

            <Route>
                <Route path="*" element={<PageNotFound />} />
                <Route path="/" exact element={<Home />} />
                <Route path="/users/login" element={<UserLogin />} />
                <Route path="/register" element={<AdherentRegister />} />
                <Route path='/login' element={<AdherentLogin />} />
                <Route path='/categoriesliste' element={<CategoriesListe />} />
                <Route path='/categoriesliste/:categoryId?' element={<CategoriesListe />} />
                <Route path="/services/detail/:id" element={<ServiceDetailsInterface />} />
                <Route path='/service/create' element={<ServicesCreate />}/>
                
            </Route>

            <Route>
                <Route path="/profileeee" element={<Profileeee />} />
                <Route path='/adherents/profile' element={<AdherentProfile />} />
                <Route path='/chat' element={<ChatApp />} />
                <Route path='/myservices/:adherentId' element={<AdherentServices />} />
                <Route path='/settings' element={<AdherentSettings />} />
                <Route path='/forgetpassword' element={<ForgetPassword />}/>
                {/* <Route path='/reclamation' element={<AdherentReclamation />} />
                <Route path='/reclamation/add' element={<AddReclamation />} /> */}
            </Route>
        </Route>
    )
);

export default ConfigRouter;
