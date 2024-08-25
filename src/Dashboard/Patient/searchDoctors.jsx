import React, { useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

const SearchDoctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get(`/api/doctor/doctor?search=${searchTerm}`);
      console.log("Search Results:", response.data.doctors);
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const handleChat = (doctorId) => {
    navigate(`/patient/patient/chats/${doctorId}`);  // Navigate to the chat page for the selected doctor
  };

  return (
    <div className='flex flex-col m-5 items-center'>
      <h2 className='font-serif font-bold text-3xl'>Find a Doctor</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="py-2 my-2 px-4 rounded-md focus:outline-none border-2 border-blue-200 mx-2 focus:ring focus:ring-[#567fbf]"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="rounded-lg bg-[#567fbf] text-white px-4 py-2 "
          type="submit"
        >
          Search
        </button>
      </form>

      {/* Display search results */}
      <div>
        {doctors.length > 0 ? (
          <div className='flex gap-10 flex-wrap justify-between items-start '>
            {doctors.map((doctor) => (
              <div key={doctor._id} className='flex flex-col bg-slate-300 shadow-xl p-5 items-center rounded-xl'>
                 <img 
                  src={doctor.profileImage} 
                  alt={`${doctor.firstName} ${doctor.lastName}`} 
                  className="w-32 h-32 object-cover rounded-xl mb-4"
                />
                <h3><strong>{doctor.firstName} {doctor.lastName}</strong></h3>
                <p>{doctor.bio}</p>
                <p>Email: {doctor.email}</p>
                <button onClick={() => handleChat(doctor._id)} className='bg-[#567fbf] text-white px-5 py-2 my-2 rounded-xl'>
                  View More
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchDoctors;
