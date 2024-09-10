import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';
import PrescriptionForm from './prescriptionForm';

const DoctorDashboard = () => {
  const [doctorId, setDoctorId] = useState('');
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchDoctorId = () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        setDoctorId(userId);
      }
    };

    fetchDoctorId();
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (doctorId) {
          const response = await axiosInstance.get('/api/patient/patient', { params: { doctorId } });
          setPatients(response.data.patients || []);
        }
      } catch (error) {
        console.error('Error fetching patients', error);
      }
    };

    fetchPatients();
  }, [doctorId]);

  const handlePatientSelect = async (id) => {
    setSelectedPatientId(id);
    if (id && doctorId) {
      try {
        const response = await axiosInstance.get(`/api/prescriptions/doctor/${doctorId}`);
        setPrescriptions(response.data.prescriptions || []);
      } catch (error) {
        console.error('Error fetching prescriptions', error);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

      {/* Patient selection */}
      <div className="mb-4">
        <label className="block text-lg font-medium">Select Patient:</label>
        <select
          onChange={(e) => handlePatientSelect(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select a patient</option>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <option key={patient.userId} value={patient.userId}>
                {patient.firstName} {patient.lastName}
              </option>
            ))
          ) : (
            <option value="" disabled>No patients available</option>
          )}
        </select>
      </div>

      {/* Render PrescriptionForm only when a patient is selected */}
      {selectedPatientId && <PrescriptionForm doctorId={doctorId} patientId={selectedPatientId} />}
      

      {/* Display Prescriptions */}
      {prescriptions.length > 0 ? (
        <div className="overflow-x-auto m-10 rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#567fbf] text-white text-xl">
              <tr>
                <th className="px-6 py-3 w-32">Date</th>
                <th className="px-6 py-3 w-48">Patient Name</th>
                <th className="px-6 py-3 w-48">Medications</th>
                <th className="px-6 py-3 w-32">Instructions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription) => (
                <tr key={prescription._id}>
                  <td className="px-6 py-4">{new Date(prescription.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    {prescription.patientId ? `${prescription.patientId.firstName} ${prescription.patientId.lastName}` : 'Unknown'}
                  </td>
                  <td className="px-6 py-4">
                    {prescription.medications.map((med, index) => (
                      <div key={index}>
                        {med.name} ({med.dosage}, {med.frequency})
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4">{prescription.instructions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No prescriptions available</p>
      )}
    </div>
  );
};

export default DoctorDashboard;
