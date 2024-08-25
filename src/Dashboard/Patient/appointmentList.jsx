import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState('');
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get(`/api/appointments/patient/${userId}`);
        setAppointments(response.data.appointments);
        console.log(response.data.appointments)
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [userId]);

  return (
    <div>
      <h1>My Appointments</h1>
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <li key={appointment._id}>
              Dr. {appointment.doctor.firstName} {appointment.doctor.lastName} - {appointment.date} - {appointment.time} - {appointment.status}
            </li>
          ))
        ) : (
          <p>No appointments found</p>
        )}
      </ul>
    </div>
  );
};

export default AppointmentList;
