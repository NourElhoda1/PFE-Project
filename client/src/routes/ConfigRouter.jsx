import React, { useState } from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Routes } from 'react-router-dom'
import Home from '../pages/interface/Home'
import Dashboard from '../pages/dashboard/Dashboard'
import Adherents from '../pages/dashboard/Adherents'
import Users from '../pages/dashboard/Users'
import UserLogin from '../pages/dashboard/UserLogin'
import Categories from '../pages/dashboard/Categories'
import Subcategories from '../pages/dashboard/Subcategories'
import Services from '../pages/dashboard/Services'
import Orders from '../pages/dashboard/Orders'
import Reclamations from '../pages/dashboard/Reclamations'
import ProfileUser from '../pages/dashboard/ProfileUser'
import PageNotFound from '../pages/PageNotFound'
import ProtectedRouter from './ProtectedRouter'
import UserCreate from '../pages/dashboard/UserCreate'
import UserUpdate from '../pages/dashboard/UserUpdate'
import CatgoriesCreate from '../pages/dashboard/CatgoriesCreate'





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
        <Route path='/subcategories' element={<Subcategories />} />
        <Route path='/adherents' element={<Adherents />} />
        <Route path='/services' element={<Services />} />
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