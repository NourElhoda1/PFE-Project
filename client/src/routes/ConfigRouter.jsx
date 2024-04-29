import React, { useState } from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Routes } from 'react-router-dom'
import Home from '../pages/interface/Home'
import Dashboard from '../pages/dashboard/Dashboard'
import Adherents from '../pages/dashboard/Adherents'
import AdherentsUpdate from '../pages/dashboard/AdherentsUpdate'
import Users from '../pages/dashboard/Users'
import UserCreate from '../pages/dashboard/UserCreate'
import UserUpdate from '../pages/dashboard/UserUpdate'
import UserLogin from '../pages/dashboard/UserLogin'
import Categories from '../pages/dashboard/Categories'
import CatgoriesCreate from '../pages/dashboard/CatgoriesCreate'
import CategoriesUpdate from '../pages/dashboard/CategoriesUpdate'
import Subcategories from '../pages/dashboard/Subcategories'
import Services from '../pages/dashboard/Services'
import ServiceDetails from '../pages/dashboard/ServiceDetails'
import Orders from '../pages/dashboard/Orders'
import Reclamations from '../pages/dashboard/Reclamations'
import ProfileUser from '../pages/dashboard/ProfileUser'
import PageNotFound from '../pages/PageNotFound'
import ProtectedRouter from './ProtectedRouter'








const ConfigRouter =createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route element={<ProtectedRouter />} >
        <Route path='/' exact element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/create' element={<UserCreate />} />
        <Route path='/users/update/:id' element={<UserUpdate />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/create' element={<CatgoriesCreate />} />
        <Route path='/categories/update/:id' element={<CategoriesUpdate />} />
        <Route path='/subcategories' element={<Subcategories />} />
        <Route path='/adherents' element={<Adherents />} />
        <Route path='/adherents/update/:id' element={<AdherentsUpdate />} />
        <Route path='/services' element={<Services />} />
        <Route path='/services/details/:id' element={<ServiceDetails />} />
        <Route path='orders' element={<Orders />} />
        <Route path='reclamations' element={<Reclamations />} />
        <Route path='/profile' element={<ProfileUser />} />
    </Route>

    <Route>
        <Route path='/users/login' element={<UserLogin />} /> 
        <Route path='*' element={<PageNotFound />} />
    </Route>
    </Route>

  )
)

export default ConfigRouter