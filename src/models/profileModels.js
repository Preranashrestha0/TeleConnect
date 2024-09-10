const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
      type: String,
      required: true,
  },
  bio: { type: String },
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  contact: {
    phone: { type: String },
    address: { type: String }
  },
  medicalHistory: {
    date: { type: Date, required: true },
    condition: { type: String, required: true },
    treatment: { type: String, required: true }
  },
  profileImage: { type: String } ,
  speciality: { type: String } , // Only for doctors
  qualification: {type: String},
  experience: {type: String}
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
