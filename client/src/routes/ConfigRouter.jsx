import React from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Routes } from 'react-router-dom'
import Home from '../pages/interface/Home'
import Dashboard from '../pages/dashboard/Dashboard'
import Admin from '../pages/dashboard/Admin'
import Adherent from '../pages/dashboard/Adherent'

const ConfigRouter =createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path='/' exact element={<Home />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/admin' element={<Admin />} />
    <Route path='/adherent' element={<Adherent />} />
    </Route>
  )
)

export default ConfigRouter