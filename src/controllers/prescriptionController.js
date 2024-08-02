const Prescription = require('../models/prescription');
const Message = require('../models/prescription');

// Create a new message
const createPrescription = async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).send(prescription);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all messages
 const getPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.find({});
    res.status(200).send(prescription);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a message by ID
const getPrescriptionbyId = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).send();
    }
    res.status(200).send(prescription);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a message
const updatePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!prescription) {
      return res.status(404).send();
    }
    res.status(200).send(prescription);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a message
const deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!prescription) {
      return res.status(404).send();
    }
    res.status(200).send(prescription);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
    createPrescription,
    getPrescription,
    getPrescriptionbyId,
    updatePrescription,
    deletePrescription
}
