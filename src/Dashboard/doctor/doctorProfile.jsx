import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../config/axiosConfig";
import { AiOutlineEdit } from "react-icons/ai";

const DoctorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName : "",
    email: "",
    speciality: "",
    experience: "",
    qualification: "",
    bio: "",
    age: 0,
    gender: "",
    profileImage: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
  
        console.log("Token:", token); // Check if the token is being retrieved correctly
        console.log("UserID:", userId); // Check if the userId is being retrieved correctly
  
        if (!token || !userId) {
          navigate("/login");
          return;
        }
  
        const response = await axiosInstance(`/api/doctor/get/${userId}`);
        const { userData, profileData } = response.data;
  
        setFormData({
          email: userData.email,
          speciality: profileData.speciality,
          experience: profileData.experience,
          qualification: profileData.qualification,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          bio: profileData.bio,
          age: profileData.age,
          gender: profileData.gender,
          phone: profileData.contact.phone,
          address: profileData.contact.address,
          profileImage: profileData.profileImage, // Assuming profileImage is a URL or file object
        });
  
        console.log("API Response:", response.data); // Log the response from the API
  
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error.message); // Log any errors
        toast.error("Failed to fetch profile");
        navigate("/login");
      }
    };
  
    fetchProfile();
  }, [navigate]);
  
   // Function to navigate to the Edit Patient page
   const handleEditClick = () => {
    const userId = localStorage.getItem("userId");
    navigate(`/doctor/doctor/edit/${userId}`);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#567fbf]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-fit">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">My Profile</h2>
        <div className="flex items-end justify-end ">
          <button 
          onClick={handleEditClick}
          className="flex bg-[#567fbf] px-2 rounded-xl text-white py-1 mb-4"> Edit {<AiOutlineEdit/>}</button>
          </div>
        <div className="flex flex-col items-center">
          
          <img
            src={profile.profileData.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-48 h-40 rounded-xl mb-4"
          />
          <h3 className="text-xl font-bold mb-2">
            {profile.profileData.firstName} {profile.profileData.lastName}
          </h3>
          <p className="text-gray-600 mb-2">
            {profile.profileData.bio}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> {profile.userData.email}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Age:</strong> {profile.profileData.age}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Gender:</strong> {profile.profileData.gender}
          </p>
          <p className="text-gray-600 mb-2">
          <strong>Phone Number:</strong> {profile.profileData.contact.phone}
          </p>
          <p className=" text-gray-600 mb-2">
            <strong>Address:</strong> {profile.profileData.contact.address}
          </p>
          
          <p className="text-gray-600 mb-2">
          <strong>Experience:</strong> {profile.profileData.experience}
          </p>
          <p className="text-gray-600 mb-2">
          <strong>Qualification:</strong> {profile.profileData.qualification}
          </p>
          <p className="text-gray-600 mb-2">
          <strong>Speciality:</strong> {profile.profileData.speciality}
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DoctorProfile;