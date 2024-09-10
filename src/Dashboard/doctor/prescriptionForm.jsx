import React, { useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';

const PrescriptionForm = ({ doctorId, patientId }) => {
  const [medications, setMedications] = useState([{ name: '', dosage: '', frequency: '' }]);
  const [instructions, setInstructions] = useState('');

  const handleMedicationChange = (index, event) => {
    const newMedications = [...medications];
    newMedications[index][event.target.name] = event.target.value;
    setMedications(newMedications);
  };

  const handleAddMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '' }]);
  };

  const handleRemoveMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/prescriptions/add', {
        doctorId,
        patientId,
        medications,
        instructions
      });
      toast.success("Prescriptions added successfully")
    } catch (error) {
      console.error('Error adding prescription', error);
      toast.error("Failed to add Prescriptions")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add Prescription</h2>

      {medications.map((medication, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl font-semibold">Medication {index + 1}</h3>
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={medication.name}
              onChange={(e) => handleMedicationChange(index, e)}
              className="block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
          <label className="block">
            Dosage:
            <input
              type="text"
              name="dosage"
              value={medication.dosage}
              onChange={(e) => handleMedicationChange(index, e)}
              className="block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
          <label className="block">
            Frequency:
            <input
              type="text"
              name="frequency"
              value={medication.frequency}
              onChange={(e) => handleMedicationChange(index, e)}
              className="block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
          <button
            type="button"
            onClick={() => handleRemoveMedication(index)}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Remove Medication
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddMedication}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Medication
      </button>

      <label className="block mb-4">
        Instructions:
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md"
          rows="4"
        />
      </label>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Submit Prescription
      </button>
    </form>
  );
};

export default PrescriptionForm;
