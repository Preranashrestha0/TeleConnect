import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig'; 
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get('/api/doctor/doctor');
        setDoctors(response.data.doctors);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error.response ? error.response.data : error.message);
        setError('Error fetching doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleEdit = (doctorId) => {
    navigate(`/admin/doctor/edit/${doctorId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className='text-center text-3xl font-serif font-bold'>Doctor List</h1>
      {doctors.length > 0 ? ( // Checking if doctors array has at least one item
        <div className="overflow-x-auto m-10 rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#567fbf] text-white text-xl">
              <tr>
                <th className="px-6 py-3 w-32">Profile Photo</th>
                <th className="px-6 py-3 w-32">Full Name</th>
                <th className="px-6 py-3 w-32">Age</th>
                <th className="px-6 py-3 w-64">Email</th>
                <th className="px-6 py-3 w-48">Phone</th>
                <th className="px-6 py-3 w-32">Address</th>
                <th className="px-6 py-3 w-32">Role</th>
                <th className="px-6 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="bg-[#567fbf] divide-y divide-gray-200 text-white">
              {doctors.map((doctor) => (
                <tr key={doctor._id}>
                 <td className="px-6 py-4 text-center">
                 <img 
                    src={doctor.profileImage} // Ensure this matches the backend field name
                    alt={`${doctor.firstName}'s profile`} 
                    className="h-16 w-16 rounded-full object-cover" 
                  />

                  </td>
                  <td className="px-6 py-4 text-center text-sm ">{`${doctor.firstName} ${doctor.lastName}`}</td>
                  <td className="px-6 py-4 text-center text-sm ">{doctor.age}</td>
                  <td className="px-6 py-4 text-center text-sm">{doctor.email}</td>
                  <td className="px-6 py-4 text-center text-sm">{doctor.contact?.phone}</td>
                  <td className="px-6 py-4 text-center text-sm">{doctor.contact?.address}</td>
                  <td className="px-6 py-4 text-center text-sm">{doctor.role}</td>
                  <td className="px-6 py-4 text-end text-sm">
                    <button
                      onClick={() => handleEdit(doctor.userId)}
                      className="text-white py-1 px-3 rounded hover:bg-blue-700"
                    >
                      <AiOutlineEdit />
                    </button>
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No doctors found</p>
      )}
    </div>
  );
};

export default DoctorList;
