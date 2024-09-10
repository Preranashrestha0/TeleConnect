const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  medications: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      frequency: { type: String, required: true }
    }
  ],
  instructions: { type: String },
  reviews: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, { timestamps: true });

const prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = prescription;
