import React from "react";
import { RouterProvider } from "react-router-dom";
import { createContext, useState } from "react";
import router from "./routes/ConfigRouter";


function App() {
  return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
