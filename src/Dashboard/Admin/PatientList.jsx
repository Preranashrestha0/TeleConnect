import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig'; 
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axiosInstance.get('/api/patient/patient');
        setPatients(response.data.patients);
      } catch (error) {
        console.error('Error fetching patients:', error.response ? error.response.data : error.message);
        setError('Error fetching patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleEdit = (patientId) => {
    navigate(`/admin/patient/edit/${patientId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className=''>
      <h1 className='text-center text-3xl font-serif font-bold'>Patient List</h1>
      {patients.length > 1 ? (
        <div className="overflow-x-auto m-10 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#567fbf] text-white text-xl">
            <tr>
              <th className="px-6 py-3 w-32">Profile Picture</th>
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
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td className="px-6 py-4 text-center">
                 <img 
                    src={patient.profileImage} // Ensure this matches the backend field name
                    alt={`${patient.firstName}'s profile`} 
                    className="h-16 w-16 rounded-full object-cover" 
                  />

                  </td>
                <td className="px-6 py-4 text-center text-sm ">{`${patient.firstName} ${patient.lastName}`}</td>
                <td className="px-6 py-4 text-center text-sm ">{patient.age}</td>
                <td className="px-6 py-4 text-center text-sm">{patient.email}</td>
                <td className="px-6 py-4 text-center text-sm">{patient.contact?.phone}</td>
                <td className="px-6 py-4 text-center text-sm">{patient.contact?.address}</td>
                <td className="px-6 py-4 text-center text-sm">{patient.role}</td>
                <td className="px-6 py-4 text-end text-sm">
                  <button
                    onClick={() => {console.log("userId: ", patient.userId); handleEdit(patient.userId)}}
                    className=" text-white py-1 px-3 rounded hover:bg-blue-700"
                  >
                    {<AiOutlineEdit/>}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
        <p>No patients found</p>
      )}
    </div>
  );
};

export default PatientList;
