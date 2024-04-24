import React from 'react'
import { RouterProvider  } from 'react-router-dom';
import { createContext, useState } from 'react';
import router from './routes/ConfigRouter'


export const UserContext = createContext();
function App() {

  const [user, setUser] = useState({ loggedIn: false });
 
  return (
    <div className='App'>
      <UserContext.Provider value={{ user, setUser }}>
     <RouterProvider router={router} />
     </UserContext.Provider>
  
    
      </div>
  )
}

export default App