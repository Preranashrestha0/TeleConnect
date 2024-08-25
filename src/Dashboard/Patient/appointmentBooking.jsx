import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get('/api/doctor/doctor'); 
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get(`/api/appointments/patient/${userId}`);
        setAppointments(response.data.appointments || []);
        console.log(response.data.appointments || []);

      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAppointment = { patient: userId, doctor: selectedDoctor, date, time };
      await axiosInstance.post('/api/appointments/appointments', newAppointment);
      toast.success('Appointment booked successfully!');
      const response = await axiosInstance.get(`/api/appointments/patient/${userId}`);
      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Error booking appointment');
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg m-8">
        <h1>Book an Appointment</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Doctor:</label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Book Appointment
        </button>
      </form>

      {appointments.length > 0 ? (
        <div className="overflow-x-auto m-10 rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#567fbf] text-white text-xl">
              <tr>
                <th className="px-6 py-3 w-32">Appointment Date</th>
                <th className="px-6 py-3 w-32">Appointment Time</th>
                <th className="px-6 py-3 w-32">Doctor Name</th>
                <th className="px-6 py-3 w-48">Profile Image</th>
                <th className="px-6 py-3 w-10">Status</th>
              </tr>
            </thead>
            <tbody className="bg-[#567fbf] divide-y divide-gray-200 text-white">
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td className="px-6 py-4 text-center text-sm">{appointment.date || 'No Date Available'}</td>
                  <td className="px-6 py-4 text-center text-sm">{appointment.time || 'No Time Available'}</td>
                  <td className="px-6 py-4 text-center text-sm">
                    {appointment.doctor ? `${appointment.doctor.firstName} ${appointment.doctor.lastName}` : 'No Doctor Available'}
                  </td>
                    <td className="px-6 py-4 text-center text-sm">
                    {appointment.doctor && appointment.doctor.profileImage ? (
                      <img src={appointment.doctor.profileImage} alt="Doctor Profile" className="w-16 h-16 rounded-full" />
                    ) : 'No Image Available'}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No appointments found</p>
      )}
    </div>
  );
};

export default BookAppointment;
