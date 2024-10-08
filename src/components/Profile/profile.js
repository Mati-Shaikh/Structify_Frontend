import React, { useState, useEffect } from "react";
import { User, Settings, LogOut } from 'lucide-react';
import { motion } from "framer-motion";
//import { FaEnvelope, FaBirthdayCake, FaSave } from 'react-icons/fa';
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // navigate to login page
    navigate("/");
  };

  return (
    <nav className="bg-white p-4 ">
      <div className="container mx-auto flex justify-between">
        {/* Structify Logo and Home Link */}
        <div className="flex items-center ml-8">
          <a href="/" style={{ fontFamily: 'Atma, sans-serif' }} className="text-4xl font-bold pt-2 text-blue-600 font-semibold hover:text-green-600">Structify</a>
          {/* <div className="flex ml-24">
                        <a href="/home" className="text-black font-medium text-xl flex items-center relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-[-2px] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
                            <FaHome className="mr-2" />
                            Home
                        </a>
                    </div> */}

        </div>

        {/* Hamburger Menu */}
        <div className="relative mr-8 ">
          <button
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="text-black p-2 rounded hover:bg-white transition-colors"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          {/* Dropdown Menu */}

          {isOpen && (
            <div
              className="absolute right-0 w-64 bg-white rounded-lg shadow-xl overflow-hidden z-10"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >

              <div className="py-2">
                <a href="/profile" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
                    <User size={18} className="text-blue-600" />
                  </span>
                  Account
                </a>
                <a href="/" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-3">
                    <Settings size={18} className="text-green-600" />
                  </span>
                  Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full mr-3">
                    <LogOut size={18} className="text-red-600" />
                  </span>
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const PersonalInfoPage = () => {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3005/api/auth/getProfile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"), // Assuming you store token in local storage
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
        alert("Error fetching user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3005/api/auth/updateProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"), // Assuming you store token in local storage
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedUser = await response.json();
      localStorage.setItem(
        "userFullName",
        updatedUser.FirstName + " " + updatedUser.LastName
      );
      setUser(updatedUser); // Update state with the new user data
      setSuccess('Personal info updated successfully!');
    } catch (error) {
      console.error(error);
      setError('Personal Info Update unsuccesful');
    }
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-8" style={{ width: "60%" }}>
        <motion.h2
          className="text-3xl font-semibold mb-2"
          
        >
          Profile Details
        </motion.h2>
        <div>
          <hr style={{ border: "0.5px solid gray" }} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-8 mt-6" >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="FirstName">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  className="shadow-md appearance-none border border-gray-300 rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-gray-300"
                  id="FirstName"
                  type="text"
                  name="FirstName"
                  value={user.FirstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="LastName">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  className="shadow-md appearance-none border border-gray-300 rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-gray-300"
                  id="LastName"
                  type="text"
                  name="LastName"
                  value={user.LastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="Age">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                className="shadow-md appearance-none border border-gray-300 rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-gray-300"
                id="Age"
                type="number"
                name="Age"
                value={user.Age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center mt-4">
              <button
                className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline border-2 border-gray-300 hover:bg-gray-300"
                type="submit"
              >
                Update
              </button>
              <p className="ml-4 text-sm text-gray-600">
                By clicking "Update personal info", I acknowledge that all <br />
                information submitted above is factually correct.
              </p>
            </div>
          </form>
        </div>
        {error && <p className="text-red-500 text-center mt-8 mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-8 mb-4">{success}</p>}
      </div>

    </div>
  );
};

export default PersonalInfoPage;
