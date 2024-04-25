import React from "react";
import { RouterProvider } from "react-router-dom";
import { createContext, useState } from "react";
import router from "./routes/ConfigRouter";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </UserProvider>
  );
}

export default App;
