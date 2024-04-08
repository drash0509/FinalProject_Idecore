import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoute from './routes/routes';

const CustomerMain = () => {
  return (
    <div>
      <Navbar />
      {/* Adjust the pt-XX based on the height of your Navbar */}
      <div className="pt-[HEIGHT_OF_NAVBAR]">
        <MainRoute />
      </div>
    </div>
  );
};

export default CustomerMain;
