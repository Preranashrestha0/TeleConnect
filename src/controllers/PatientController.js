const express = require('express');
const router = express.Router();
const User = require('../models/authUserModel');
const Profile = require('../models/profileModels');
const bcrypt = require('bcryptjs');
const domain = "http://localhost:5000";
// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
};

const registerPatient = async(req, res) => {
  const { email, password, firstName, lastName, age, gender, phone, address, medicalHistory, profileImage } = req.body;

  try {
    // Create new user
    const user = new User({
      email,
      password,
      role: 'patient'
    });
    await user.save();

    // Create new profile
    const profile = new Profile({
      userId: user._id,
      firstName,
      lastName,
      age,
      gender,
      contact: {
        phone,
        address
      },
      medicalHistory,
      profileImage
    });
    await profile.save();

    res.status(201).json({ message: 'Patient registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering patient', error: error.message });
  }
};
//get Patients 
const getPatient = async (req, res) => {
  try {
    // Aggregate data from both collections
    const users = await User.find({ role: 'patient' }); // or use any query you need
    const profiles = await Profile.find(); // or use any query you need

    // Combine data
    const combinedData = users.map(user => {
      const profile = profiles.find(p => p.userId.toString() === user._id.toString());
      return {
        ...user._doc,
        ...profile?._doc
      };
    });

    res.status(200).json({ patients: combinedData });
  } catch (error) {
    console.error('Error fetching doctors:', error.message);
    res.status(500).json({ msg: 'Error fetching doctors', error: error.message });
  }
}

const getPatientById = async (req, res) => {
  const patientId = req.params.patientId;

  try {
    const user = await User.findById(patientId);
    const profile = await Profile.findOne({ userId: patientId }).populate('userId');

    if (!user || !profile) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({
      userData: {
        role: user.role,
        email: user.email,
      },
      profileData: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        bio: profile.bio,
        age: profile.age,
        gender: profile.gender,
        contact: profile.contact,
        medicalHistory: profile.medicalHistory,
        profileImage: profile.profileImage,
      }
    });
  } catch (error) {
    console.error('Error fetching patient:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


const getMedicalHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findOne({ userId: id });

    if (!profile) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }

    res.json({ medicalHistory: profile.medicalHistory });
  } catch (error) {
    console.error('Error fetching medical history:', error);
    res.status(500).json({ message: 'Server error' });
  }
}




// Update patient data
const updatePatient = async (req, res) => {
  const patientId = req.params.patientId;
  const { firstName, lastName, email, age, gender, phone, address, bio, medicalHistory } = req.body;

  try {
    // Update user data
    let updateUserData = { email}
    const updatedUser = await User.findByIdAndUpdate(
      patientId,
      updateUserData,
      { new: true }
    );

    if(!updatedUser){
      res.status(404).json({msg:"doctor userid is not found"})
    }
    
    let updateData = {firstName, lastName, age, gender, bio, medicalHistory};
    updateData.contact = {
      phone: phone, 
      address: address
    }
    
    
    if (req.file) {
      updateData.profileImage = `${domain}/uploads/profiles/${req.file.filename}`;
    }

    
    // Update profile data
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: patientId },
      updateData,
      { new: true }
    );

    if ( !updatedProfile) {
      return res.status(404).json({ msg: 'patient not found' });
    }

    res.status(200).json({
      msg: 'patient updated successfully',
      doctor: {updatedUser, profile: updatedProfile },
      sucess: true
    });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ msg: 'Error updating doctor', error: error.message });
  }
};

module.exports = {
  registerPatient,
  getPatient,
  updatePatient,
  getPatientById,
  getMedicalHistory
};