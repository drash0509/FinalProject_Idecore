import React, { useState } from "react";
import pwd from "../images/pwd.png";
import pwdh from "../images/pwdh.png";
import axios from "axios";

const SellerRegisterForm = ({ onToggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      username: username,
      password: password,
      confirm_password: confirmPassword,
    };

    if (password === confirmPassword) {
      console.log(data);
      axios
        .post("http://localhost:4001/register", data)
        .then((res) => {
          console.log("res.data : ", res.data);
          if (res) {
            console.log(res);
            alert("Succesfully registered");
            onToggleForm();
          }
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            // Check if the server provided a specific error message
            if (error.response.data.message) {
              alert("Registration failed: " + error.response.data.message);
            } else if (
              error.response.data.errors &&
              error.response.data.errors.length > 0 &&
              error.response.data.errors[0].msg
            ) {
              // Check if there are validation errors and the first error message is present
              alert(
                "Registration failed: " + error.response.data.errors[0].msg
              );
            } else {
              // Handle other types of errors
              alert("Registration failed. Please try again.");
            }
          } else {
            alert("An unexpected error occurred. Please try again later.");
          }
        });
    } else {
      alert("Confirm password should match password");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col w-full mb-4">
          <label className="self-start mb-2 font-bold text-[#49372B]">
            Name
          </label>
          <input
            className="mb-2 p-2 border rounded border-[rgba(110,89,75,0.4)] bg-[rgba(250,250,250,0.8)] w-full"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label className="self-start mb-2 font-bold text-[#49372B]">
            Email
          </label>
          <input
            className="mb-2 p-2 border rounded border-[rgba(110,89,75,0.4)] bg-[rgba(250,250,250,0.8)] w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label className="self-start mb-2 font-bold text-[#49372B]">
            Username
          </label>
          <input
            className="mb-2 p-2 border rounded border-[rgba(110,89,75,0.4)] bg-[rgba(250,250,250,0.8)] w-full"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mb-4 relative">
          <label className="self-start mb-2 font-bold text-[#49372B]">
            Password
          </label>
          <input
            className="mb-2 p-2 border rounded border-[rgba(110,89,75,0.4)] bg-[rgba(250,250,250,0.8)] w-full"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mb-4 relative">
          <label className="self-start mb-2 font-bold text-[#49372B]">
            Confirm Password
          </label>
          <input
            className="p-2 border rounded border-[rgba(110,89,75,0.4)] bg-[rgba(250,250,250,0.8)] w-full"
            type={isPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="absolute inset-y-0 right-0 mr-3 mt-8 text-right bg-none border-none p-0 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <img
              src={isPasswordVisible ? pwdh : pwd}
              alt="Toggle Password Visibility"
              className="w-8 h-8"
            />
          </button>
        </div>
        <button
          className="w-full py-4 mt-8 bg-[rgba(73,47,29,1)] text-white rounded cursor-pointer"
          onClick={handleSubmit}
        >
          Register
        </button>
        <div className="flex items-center mt-4">
          Already have an account?
          <div
            className="ml-2 text-[rgba(73,47,29,1)] cursor-pointer"
            onClick={onToggleForm}
          >
            LOGIN
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerRegisterForm;
