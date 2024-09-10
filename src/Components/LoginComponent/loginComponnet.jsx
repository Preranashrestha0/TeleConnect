// import React from 'react'
// import logo from '../NavBarComponent/Logo.png'


// const LoginComponnet = () => {
//   return (
//     <div className='bg-blue-900 h-screen w-screen flex justify-center items-center'>
//         <form className='bg-white rounded-xl w-fit h-fit flex flex-col items-center'>
//             <img className='w-1/3 m-5 p-3 ' src={logo} alt='logo'/>
//             <h1 className='font-bold text-3xl text-center m-2'>Login</h1>
        
//              <div className="w-full flex flex-col items-center p-5">
//                 <label className='text-xl font-semibold w-full' htmlFor='username'>Username</label>
//                 <input  className='rounded-lg border-2 border-blue-200 p-2 w-full' type='text' id='username' placeholder='Enter your username' />
                
//                 <label className='text-xl font-semibold w-full ' htmlFor='password'>Password</label>
//                 <input className='rounded-lg border-2 border-blue-200 p-2 w-full' type='password' id='password' placeholder='Enter your password' />
                
//             </div>

//         <button className='bg-blue-900 text-white px-5 py-2 rounded-xl m-5 text-center font-bold w-1/2'>
//             SUBMIT
//         </button>
//     </form> 
// </div>

//   )
// }

// export default LoginComponnet

// src/LoginComponent.js

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!loginData.email) errors.email = "Email is required";
    if (!loginData.password) errors.password = "Password is required";
    if (!loginData.role) errors.role = "Role is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/loginUser",
          loginData
        );
        const { patientId } = response.data; 
        console.log(response);
        // set token in local storage
          // Inside your login success callback
          localStorage.setItem("token", response.data.token);
          const decodedToken = jwtDecode(response.data.token);
          localStorage.setItem("userId", decodedToken.user.id);
        

        // show success message
        toast.success("Login successful");

        // Decode JWT to get the role
        const role = decodedToken.user.role;

        // Navigate based on role
        if (role === "admin") {
          navigate("/admin");
          return null;
        } else if (role === "doctor") {
          navigate("/doctor/homepage");
        } else if (role === "patient") {
          navigate("/patient");
        }
      } catch (error) {
        console.error(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#567fbf] ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <ToastContainer />
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-8"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500 cursor-pointer" />
              ) : (
                <FaEye className="text-gray-500 cursor-pointer" />
              )}
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              type="role"
              id="role"
              placeholder="Enter your role"
              name="role"
              value={loginData.role}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.role}</div>
            )}
          </div>
          <button
            className="w-full bg-[#567fbf]  text-white py-2 px-4 rounded-md hover:bg-[#567fbf]  focus:outline-none focus:bg-[#567fbf] "
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;