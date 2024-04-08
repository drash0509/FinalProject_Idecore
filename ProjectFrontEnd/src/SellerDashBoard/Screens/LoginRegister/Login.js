import React, { useState } from "react";
import pwd from "../../images/pwd.png";
import pwdh from "../../images/pwdh.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const SellerLoginForm = ({ onToggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username: username, password: password };
    console.log(data);

    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 2 * 24 * 60 * 60 * 1000);

    axios
      .post("http://localhost:4001/seller_login", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          alert("Login Success");
          Cookies.set("seller_user", res.data.token, { expires: 2 });
          Navigate("/SellerDashboard/*");
        } else if (res.data.code === 404) {
          if (res.data.message === "Enter valid user") {
            alert("Enter valid user");
          } else if (res.data.message === "Enter valid password") {
            alert("Enter valid password");
          } else {
            alert("Login failed: " + res.data.message);
          }
        } else {
          alert("Login failed");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center justify-center w-full p-4">
        <div className="flex flex-col w-full mb-4">
          <label className="self-start mb-2 text-lg font-bold text-[#49372B]">
            Username
          </label>
          <input
            className="mb-2 p-2 border rounded-lg bg-[rgba(250,250,250,0.8)] border-[rgba(110,89,75,0.4)]"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mb-4 relative">
          <label className="self-start mb-2 text-lg font-bold text-[#49372B]">
            Password
          </label>
          <input
            className="mb-2 p-2 border rounded-lg bg-[rgba(250,250,250,0.8)] border-[rgba(110,89,75,0.4)]"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute inset-y-0 right-0 mr-3 mt-8"
            onClick={togglePasswordVisibility}
          >
            <img
              src={isPasswordVisible ? pwdh : pwd}
              alt="Toggle Password Visibility"
              className="w-8 h-8"
            />
          </button>
        </div>
        <div className="self-start mt-4 mb-4 text-[rgba(73,47,29,1)] cursor-pointer">
          Forget Password?
        </div>
        <button
          className="w-full py-4 bg-[rgba(73,47,29,1)] text-white rounded-lg cursor-pointer mt-2"
          onClick={handleSubmit}
        >
          Login
        </button>
        <div className="mt-4 flex items-center">
          Don't have an account?
          <div
            className="ml-2 text-[rgba(73,47,29,1)] cursor-pointer"
            onClick={onToggleForm}
          >
            REGISTER
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLoginForm;
