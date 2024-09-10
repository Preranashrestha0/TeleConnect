import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';
import ReviewForm from './reviewForm'; // Import the ReviewForm component
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState('');
  const navigate = useNavigate('');

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axiosInstance.get(`/api/prescriptions/patient/${userId}`);
          setPrescriptions(response.data.prescriptions || []);
        }
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        setError('Failed to fetch prescriptions.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleReviewClick = (prescriptionId) => {
    setSelectedPrescriptionId(prescriptionId);
    navigate(`/patient/patient/review/${prescriptionId}`)
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Prescriptions</h1>

      {prescriptions.length > 0 ? (
        <div className="overflow-x-auto m-10 rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#567fbf] text-white text-xl">
              <tr>
                <th className="px-6 py-3 w-32">Date</th>
                <th className="px-6 py-3 w-48">Doctor Name</th>
                <th className="px-6 py-3 w-48">Medications</th>
                <th className="px-6 py-3 w-32">Instructions</th>
                <th className="px-6 py-3 w-32">Add Review</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription) => (
                <tr key={prescription._id}>
                  <td className="px-6 py-4">{new Date(prescription.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    {prescription.doctorId ? `${prescription.doctorId.firstName} ${prescription.doctorId.lastName}` : 'Unknown'}
                  </td>
                  <td className="px-6 py-4">
                    {prescription.medications.map((med, index) => (
                      <div key={index}>
                        {med.name} ({med.dosage}, {med.frequency})
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4">{prescription.instructions}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleReviewClick(prescription._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Add Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Render ReviewForm only for the selected prescription */}
          {selectedPrescriptionId && (
            <ReviewForm prescriptionId={selectedPrescriptionId} />
          )}
        </div>
      ) : (
        <p>No prescriptions available</p>
      )}
    </div>
  );
};

export default PatientDashboard;
