import React, { useState } from 'react';
import emailIcon from "../images/email.png";

function Email() {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(null);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleValidation = () => {
        const valid = validateEmail(email);
        setIsValid(valid);
        if (valid) {
            alert("Email is valid!");
        } else {
            alert("Email is invalid.");
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between p-5  border border-[#504238] bg-[#FAF4F4] overflow-hidden rounded-lg my-2 md:p-0 ">
            <img src={emailIcon} alt="Email" className="w-8 h-8  sm:h-auto m-2 md:m-2" />
            <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-[#FAF4F4] border-0 outline-none m-2 p-2 text-sm sm:text-base"
            />
            {isValid !== null && (
                <span className={`m-2 text-sm sm:text-base ${isValid ? 'text-green-500' : 'text-red-500'}`}>
                    {isValid ? 'Valid Email' : 'Invalid Email'}
                </span>
            )}
            <button onClick={handleValidation} className=" w-full sm:w-auto bg-[#504238] text-white font-light text-sm sm:text-lg border-none cursor-pointer px-5 py-3.5 rounded-md ">

<strong>
Subscribed

</strong>
            </button>
        </div>
    );
}

export default Email;
