import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../../config/axiosConfig';

const RegisterPatient = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    medicalHistory: "",
    age: 0,
    gender: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    const { firstName, lastName, email, address, phone, age, gender, medicalHistory, password, confirmPassword } = formData;

    if (!firstName) errors.firstName = "First Name is required.";
    if (!lastName) errors.lastName = "Last Name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid.";
    if (!address) errors.address = "Address is required.";
    if (!phone) errors.phone = "Phone number is required.";
    else if (!/^\d+$/.test(phone)) errors.phone = "Phone number must be numeric.";
    if (!age) errors.age = "Age is required.";
    else if (!/^\d+$/.test(age)) errors.age = "Age must be a number.";
    if (!gender) errors.gender = "Gender is required.";
    if (!medicalHistory) errors.medicalHistory = "Medical History is required.";
    if (!password) errors.password = "Password is required.";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters long.";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords must match.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axiosInstance.post('/api/patient/registerPatient', formData);
        toast.success("Patient registered successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          medicalHistory: "",
          age: "",
          gender: "",
          phone: "",
          address: "",
          password: "",
        });
        toast.success('Patient registered successfully')
        navigate('/admin/patient/list'); // Redirect after successful registration
      } catch (error) {
        console.error('Error registering patient:', error.response ? error.response.data : error.message);
        toast.error('Error registering patient');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className='font-serif py-5 text-center text-2xl font-bold text-black'>
        Patient Registration
      </div>
      <form onSubmit={handleSubmit} className="bg-[#567fbf] p-8 rounded-lg shadow-lg max-w-xl mx-auto">
        <ToastContainer />
        <div className='flex flex-row mb-2'>
          <div className='mx-5'>
            <label className='block text-white text-sm font-bold mb-2'>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="rounded w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
          </div>
          <div className='mx-5'>
            <label className='block text-white text-sm font-bold mb-2'>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="rounded w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
          </div>
        </div>
        <div className='mx-5 mb-2'>
          <label className='block text-white text-sm font-bold mb-2'>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="rounded w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        </div>
        <div className='mx-5 mb-2'>
          <label className='block text-white text-sm font-bold mb-2'>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="rounded w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
        </div>
        <div className='mx-5 mb-2'>
          <label className='block text-white text-sm font-bold mb-2'>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="rounded w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
        </div>
        <div className='flex flex-row mb-2'>
          <div className='mx-5'>
            <label className='block text-white text-sm font-bold mb-2'>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="rounded w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.age && <div className="text-red-500 text-sm">{errors.age}</div>}
          </div>
          <div className='mx-5'>
            <label className='block text-white text-sm font-bold mb-2'>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className='px-4 text-start rounded w-full py-2 text-black leading-tight focus:outline-none focus:shadow-outline'
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <div className="text-red-500 text-sm">{errors.gender}</div>}
          </div>
        </div>
        <div className='mx-5 mb-2'>
          <label className='block text-white text-sm font-bold mb-2'>Medical History:</label>
          <input
            type="text"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleInputChange}
            className="rounded w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.medicalHistory && <div className="text-red-500 text-sm">{errors.medicalHistory}</div>}
        </div>
        <div className='mx-5 mb-2'>
          <label className='block text-white text-sm font-bold mb-2'>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="rounded w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
        </div>
        <div className='mx-5 mb-2'>
          <label className='block text-white text-sm font-bold mb-2'>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="rounded w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}
        </div>
        <div className='text-center mt-4'>
          <button
            type="submit"
            className='bg-pink-600 px-5 rounded-xl py-3 text-center text-white font-bold font-serif text-xl'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPatient;
