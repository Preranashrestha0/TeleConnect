// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../config/axiosConfig';
// import { useParams } from 'react-router-dom';

// const PatientDashboard = () => {
//   const { patientId } = useParams();
//   const [patientData, setPatientData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const response = await axiosInstance.get(`/api/patient/get/${patientId}`);
//         setPatientData(response.data);
//       } catch (error) {
//         console.error('Error fetching patient data:', error.response ? error.response.data : error.message);
//         setError('Error fetching patient data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientData();
//   }, [patientId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="flex min-h-screen bg-gray-500 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Profile Overview */}
//         <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex items-center">
//           <img
//             src={patientData.profileImage || "https://via.placeholder.com/150"}
//             alt="Profile"
//             className="w-24 h-24 rounded-full object-cover mr-6"
//           />
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {patientData.firstName} {patientData.lastName}
//             </h2>
//             <p className="text-gray-600">Age: {patientData.age} | {patientData.gender}</p>
//             <p className="text-gray-600">{patientData.email}</p>
//           </div>
//         </div>

//         {/* Medical History */}
//         <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Medical History</h3>
//           <p className="text-gray-600">{patientData.medicalHistory || "No medical history available."}</p>
//         </div>

//         {/* Upcoming Appointments */}
//         <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
//           {patientData.appointments && patientData.appointments.length > 0 ? (
//             <ul className="text-gray-600">
//               {patientData.appointments.map((appointment, index) => (
//                 <li key={index} className="mb-2">
//                   Appointment with {appointment.doctorName} on {appointment.date} at {appointment.time}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No upcoming appointments.</p>
//           )}
//         </div>

//         {/* Prescriptions */}
//         <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Prescriptions</h3>
//           {patientData.prescriptions && patientData.prescriptions.length > 0 ? (
//             <ul className="text-gray-600">
//               {patientData.prescriptions.map((prescription, index) => (
//                 <li key={index} className="mb-2">
//                   {prescription.name} - {prescription.dosage}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No active prescriptions.</p>
//           )}
//         </div>

//         {/* Contact Information */}
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
//           <p className="text-gray-600">Phone: {patientData.phone}</p>
//           <p className="text-gray-600">Address: {patientData.address}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;
// src/components/PatientProfile.js



