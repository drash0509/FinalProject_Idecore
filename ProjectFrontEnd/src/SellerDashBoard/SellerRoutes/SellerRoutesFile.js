import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../Screens/Home/Home';
import SellerMainLogin from '../Screens/LoginRegister/MainLogin';
import AddProduct from '../Screens/AddProduct/AddProduct';
import ProductData from '../Screens/ProductData/ProductData';
const SellerRoutesFile = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/AddProduct" element={<AddProduct/>} />
      <Route path="/SellerMainLogin" element={<SellerMainLogin/>} />
      <Route path="/ProductData" element={<ProductData/>} />

    </Routes>
  );
}

export default SellerRoutesFile;
