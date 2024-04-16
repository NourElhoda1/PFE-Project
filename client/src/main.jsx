import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from "./app/store.js";
import { Provider } from "react-redux";

// import Home from './pages/interface/Home.jsx'
// import Dashboard from './pages/dashboard/Dashboard.jsx'
// import Admin from './pages/dashboard/Admin.jsx'
// import Adherent from './pages/dashboard/Adherent.jsx'

// const router =createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//     <Route path='/' element={<Home />} />
//     <Route path='/dashboard' element={<Dashboard />} />
//     <Route path='/admin' element={<Admin />} />
//     <Route path='/adherent' element={<Adherent />} />
//     </Route>
//   )
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
      <App />
  </Provider>
</React.StrictMode>
)
