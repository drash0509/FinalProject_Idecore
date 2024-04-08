import React, { useEffect, useState } from 'react';
import mainbg from '../../images/Homemain.png'; // Ensure this path is correct

const Welcome = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="md:min-h-screen bg-cover bg-center flex items-center justify-center h-80"
      style={{ backgroundImage: `url(${mainbg})` }}
    >
      <div className={`p-5 md:p-10 flex flex-col md:w-[30vw] items-center justify-center bg-[rgba(73,47,29,0.4)] rounded-lg ${animate ? 'fadeIn' : ''}`}>
        <h1 className={`text-4xl md:text-5xl font-extrabold text-[#6E594B] mb-4 transition-opacity duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`}>
          IDECORE
        </h1>
        <h2 className={`text-2xl md:text-3xl font-semibold text-white mb-2 transition-opacity duration-500 delay-100 ${animate ? 'opacity-100' : 'opacity-0'}`}>
          FURNITURE
        </h2>
        <p className={`text-md md:text-xl text-white font-light transition-opacity duration-500 delay-200 ${animate ? 'opacity-100' : 'opacity-0'}`}>
          Make your home look elegant
        </p>
      </div>
    </div>
  );
}

export default Welcome;
