import React from 'react';
import { Routes, Route } from "react-router-dom";
import CustomerMain from '../CustomerDashboard/CustomerMain';
import SellerMain from '../SellerDashBoard/SellerMain';
const RouteMainFile = () => {
  return (
    <Routes>
      <Route path="/SellerDashboard/*" element={<SellerMain/>} />
      <Route path="/*" element={<CustomerMain />} />

     
    </Routes>
  );
}

export default RouteMainFile;
