import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import profile from "../images/profile.png";
import Cookies from "js-cookie";
import axios from "axios";

export default function SellerNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (pathname) => location.pathname === pathname;

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const seller_user = Cookies.get("seller_user");

  const handleMenuItemClick = (itemName) => {
    console.log(itemName);
  };
  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      onClick={() => handleNavigation(to)}
      className={`block py-2 pr-4 pl-3 text-white rounded md:hover:bg-transparent md:border-0 md:hover:text-white ${
        isActive(to)
          ? "font-bold bg-transparent"
          : "hover:bg-[rgba(73,47,29,0.4)]"
      }`}
    >
      {children}
    </Link>
  );

  const logout = async () => {
    try {
      console.log("hiii");
      const res = await axios.delete("http://localhost:4001/seller_logout", {
        headers: {
          authorization: `Bearer ${seller_user}`,
        },
      });
      console.log(res.data);
      if (res.data.status === 200) {
        Cookies.remove("seller_user");
        alert("succesfuly logout");
        handleNavigation("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <nav className="bg-[rgba(73,47,29,1)] relative w-full z-20 top-0 start-0">
      <div className="max-w-screen px-6 flex items-center justify-between md:justify-start mx-auto  py-3">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Logo"
            className="h-16 w-16 object-contain rounded-lg border-2 border-[#49372B]"
          />
        </Link>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:flex-row md:items-center md:space-x-8 md:mt-0 md:text-sm md:font-medium md:w-full md:justify-between justify-self-center`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-medium">
            <li>
              {seller_user ? (
                <NavLink to="/SellerDashboard/Home">Home</NavLink>
              ) : (
                navigate("/SellerDashboard/SellerMainLogin")
              )}
            </li>
            <li>
              {seller_user ? (
                <NavLink to="/SellerDashboard/AddProduct">Add Products</NavLink>
              ) : (
                navigate("/SellerDashboard/SellerMainLogin")
              )}
            </li>
            <li>
              {seller_user ? (
                <NavLink to="/SellerDashboard/ProductData">
                  Product Data
                </NavLink>
              ) : (
                navigate("/SellerDashboard/SellerMainLogin")
              )}
            </li>
          </ul>
          <div className="relative">
            <button
              className="bg-none border-none outline-none "
              onClick={toggleMenu}
            >
              <img
                src={profile}
                alt="Profile"
                className="h-8 w-auto object-contain"
              />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 bg-white border w-32 mr-0 rounded shadow-md">
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-fit text-left"
                  onClick={() => handleMenuItemClick("Help")}
                >
                  Help
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  onClick={() => handleNavigation("/Contactus")}
                >
                  Contact Us
                </button>

                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  onClick={() => handleNavigation("/")}
                >
                  Customer Account
                </button>

                {seller_user ? (
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    onClick={() => {
                      logout();
                      handleNavigation("/SellerDashboard");
                    }}
                  >
                    Log Out
                  </button>
                ) : (
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    onClick={() =>
                      handleNavigation("/SellerDashboard/SellerMainLogin")
                    }
                  >
                    Log In
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          className="bg-none border-none outline-none md:hidden"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
