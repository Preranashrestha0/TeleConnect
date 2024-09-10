const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
    },
    notes: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
