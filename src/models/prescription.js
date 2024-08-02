const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  doctorId: {
     type: Schema.Types.ObjectId,
      ref: 'User', required: true
     },
  patientId: { 
    type: Schema.Types.ObjectId,
     ref: 'User', 
     required: true
     },
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String
  }],
  instructions: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;
