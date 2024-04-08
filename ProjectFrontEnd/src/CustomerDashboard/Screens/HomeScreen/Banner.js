import React, { useState } from "react";
import mainbg from "../../images/organizer.png";
import { useNavigate } from "react-router-dom";


const Banner = () => {


  const navigate = useNavigate();

  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <div
    className="h-screen w-full bg-no-repeat bg-cover bg-center flex items-center justify-center flex-col p-2"
    style={{ backgroundImage: `url(${mainbg})` }}
  >
    <div className="bg-[rgba(200,188,183,0.6)] rounded-lg p-4 sm:p-8 md:p-20 flex flex-col items-center justify-center">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#524339] text-center mb-2 sm:mb-4">New Collection Alert</h2>
      <h1 className="text-2xl sm:text-3xl md:text-4xl  text-center font-semibold text-white mb-2 sm:mb-3">Stylish Organizers for Every Room!</h1>
      <p className="text-md sm:text-lg md:text-xl font-medium text-white">Unlock Clutter-Free Living</p>
    </div>
    <div className="mt-4 sm:mt-8">
      <button
        onClick={() => handleNavigation('/CustomerDashboard/Organizers')}
        className="bg-[#524339] text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-medium text-md sm:text-lg hover:bg-transparent hover:text-[#524339] hover:border-2 hover:border-black transition duration-300 ease-in-out"
      >
        SHOP NOW
      </button>
    </div>
  </div>
  );
};

const styles = {
  mainScreen: {
    height: "90vh",
    width: "100vw",
    backgroundImage: `url(${mainbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  content: {
    padding: "5vh 5vw",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "rgba(200,188,183,0.6)",
    borderRadius: "2vw",
  },
  welcome: {
    fontSize: "4vw",
    lineHeight: "4.5vw",
    fontWeight: "900",
    spanAlign: "center",
    color: "#524339",
  },
  heading: {
    fontSize: "2vw",
    fontWeight: "600",
    spanAlign: "initial",
    color: "white",
  },
  subheading: {
    fontSize: "1.1vw",
    lineHeight: "1.3vw",
    fontWeight: "300",
    spanAlign: "initial",
    color: "white",
  },
  button: {
    padding: "0.6vw 0.9vw",
    borderRadius: "0.4vw",
    backgroundColor: "#524339",
    color: "white",
    fontSize: "1.3vw",
    outline: "none",
    border: "none",
  },

  buttonHover: {
    outline: "none",
    backgroundColor: "rgba(0,0,0,0)",
    color: "#524339",
    border: "2px solid black",
  },

 
};
export default Banner;
