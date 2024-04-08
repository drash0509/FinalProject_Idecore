import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './Register';
import bg from '../images/Banner.png'

export default function Login() {
    const [isLoginActive, setIsLoginActive] = useState(true);

    const toggleForm = () => {
        setIsLoginActive(!isLoginActive);
    };

    

   

    return (
        <div className="flex flex-col items-center justify-center px-4 h-screen w-full bg-cover bg-center " style={{ backgroundImage: `url(${bg})` }}>
        <div className="relative flex flex-col items-center w-full max-w-lg overflow-auto border border-gray-400 rounded-lg shadow-md bg-[#D8CBC4] p-6 md:p-8 lg:w-[45vw] my-10  lg:max-w-2xl">
           <div className="flex justify-center w-full mb-4 rounded-lg">
               <div className="flex w-full bg-[rgba(73,47,29,0.4)] rounded-lg">
                   <button
                       onClick={() => setIsLoginActive(true)}
                       className={`flex-1 py-2 px-4 text-sm font-medium ${isLoginActive ? 'bg-[rgba(73,47,29,1)] text-white' : 'bg-transparent text-[#49372B]'} rounded-lg transition-colors duration-300 ease-in-out md:text-base lg:py-3 lg:px-6`}
                   >
                       Login
                   </button>
                   <button
                       onClick={() => setIsLoginActive(false)}
                       className={`flex-1 py-2 px-4 text-sm font-medium ${!isLoginActive ? 'bg-[rgba(73,47,29,1)] text-white' : 'bg-transparent text-[#49372B]'} rounded-lg transition-colors duration-300 ease-in-out md:text-base lg:py-3 lg:px-6`}
                   >
                       Register
                   </button>
               </div>
           </div>
           <div className="w-full">
               {isLoginActive ? < LoginForm onToggleForm={toggleForm}/> : <RegisterForm onToggleForm={toggleForm}/>}
           </div>
       </div>
      </div>
    );
};
  

