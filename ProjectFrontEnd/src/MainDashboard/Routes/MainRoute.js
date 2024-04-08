import React from 'react'
import {  Routes, Route } from "react-router-dom";
import HomeMain from '../Screens/HomeMain';
import AboutUs from '../../CustomerDashboard/Screens/About/AboutUs';

const MainRoutes = () => {
  console.log('Rendering RouteMainFile');

  return (

    <Routes>
        <Route path="/" element={<HomeMain/>} />
        <Route path="/MainDashboard/Home" element={<HomeMain/>} />
        <Route path="/MainDashboard/AboutUs" element={<AboutUs/>} />
      </Routes>

 
  )
}

export default MainRoutes;



