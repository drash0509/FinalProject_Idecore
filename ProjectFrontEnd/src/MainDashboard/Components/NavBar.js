import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../CustomerDashboard/images/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (pathname) => location.pathname === pathname;

  return (
    <div className="bg-[rgba(73,47,29,1)]">
      <nav className="container mx-auto px-6 py-3 flex justify-between md:justify-start  items-center">
        <a className="flex items-center" href="/">
          <img src={logo} alt="Logo" className="h-16 w-16 mr-10 object-contain rounded-lg border-2 border-[#49372B]" />
        </a>
        <div className="flex md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} type="button">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
        <div className={`${isOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-medium">
            <li>
              <Link to="/MainDashboard/home" className={`block py-2 pr-4 pl-3 text-white rounded hover:bg-[rgba(73,47,29,0.4)] md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 ${isActive('/MainDashboard/home') ? 'font-bold' : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/MainDashboard/AboutUs" className={`block py-2 pr-4 pl-3 text-white rounded hover:bg-[rgba(73,47,29,0.4)] md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 ${isActive('/MainDashboard/AboutUs') ? 'font-bold' : ''}`}>
                About
              </Link>
            </li>
            <li>
              <Link to="/MainDashboard/Contactus" className={`block py-2 pr-4 pl-3 text-white rounded hover:bg-[rgba(73,47,29,0.4)] md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 ${isActive('/MainDashboard/Contactus') ? 'font-bold' : '' }`}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
