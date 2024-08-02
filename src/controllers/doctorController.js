const Doctor = require('../models/doctorModel');

// Create a new doctor
const createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor({ ...req.body, addedBy: req.user._id });
    await doctor.save();
    res.status(201).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send(doctors);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).send();
    }
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a doctor
const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doctor) {
      return res.status(404).send();
    }
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).send();
    }
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createDoctor,
  getDoctorById,
  getDoctors, 
  deleteDoctor,
  updateDoctor
}