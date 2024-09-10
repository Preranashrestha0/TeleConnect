const Prescription = require('../models/Prescription');
const User = require('../models/authUserModel');


const addPrescription = async (req, res) => {
  try {
    const { doctorId, patientId, medications, instructions } = req.body;

    // Validate doctor and patient
    const doctor = await User.findById(doctorId);
    const patient = await User.findById(patientId);

    if (!doctor || doctor.role !== 'doctor') {
      return res.status(400).json({ message: 'Invalid doctor ID' });
    }

    if (!patient || patient.role !== 'patient') {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }

    const newPrescription = new Prescription({
      doctorId,
      patientId,
      medications,
      instructions
    });

    await newPrescription.save();
    res.status(201).json({ message: 'Prescription created successfully', prescription: newPrescription });
  } catch (error) {
    res.status(500).json({ message: 'Error creating prescription', error });
  }
};

const getPrescription = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ doctorId: req.params.doctorId })
      .populate('patientId', 'firstName lastName')
      .populate('doctorId', 'firstName lastName');
    res.status(200).json({ prescriptions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescriptions', error });
  }
};

const getPrescriptionsForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    
    // Validate patient ID
    const patient = await User.findById(patientId);
    
    if (!patient || patient.role !== 'patient') {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }

    const prescriptions = await Prescription.find({ patientId })
      .populate('doctorId', 'firstName lastName')
      .exec();

    res.status(200).json({ prescriptions });
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  addPrescription,
  getPrescription,
  getPrescriptionsForPatient
};
