import React from "react";
import {Routes, Route } from "react-router-dom";
import { Dashboard,Landing } from "./pages";



const DashboardRoutes = () => {
  return (

    <div>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
      </Routes>
      
    </div>
  );
};

const App = () => {
  return (
  

    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />}/>
      </Routes>
    </div>
   
  );

  
};

export default App;
