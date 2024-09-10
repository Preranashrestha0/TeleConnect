const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentModel');

// Get appointments for a specific patient
const getAppointmentsPatient = async (req, res) => {
    const patientId = req.params.patientId;

    try {
        const appointments = await Appointment.find({ patient: patientId }).populate('doctor');
    
        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found' });
        }

        res.status(200).json({ appointments });
    } catch (error) {
        console.error('Error fetching appointments:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};  

// Get appointments for a specific doctor
const getAppointmentsDoctor =  async (req, res) => {
  try {
      const appointments = await Appointment.find({ doctor: req.params.doctorId }).populate('patient');
      res.status(200).json(appointments);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const addAppointments = async (req, res) => {
    const { patient, doctor, date, time } = req.body;

    try {
        // Create new appointment
        const appointment = new Appointment({
            patient,
            doctor,
            date,
            time
        });

        await appointment.save();

        res.status(201).json({ message: 'Appointment created successfully!', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Error creating appointment', error: error.message });
    }
};

// Update appointment
const updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Cancel appointment
const deleteAppointments = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
  getAppointmentsDoctor,
  getAppointmentsPatient,
  addAppointments,
  updateAppointment,
  deleteAppointments
};
