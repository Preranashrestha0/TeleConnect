const express = require('express');
const router = express.Router();
const User = require('../models/authUserModel');
const Profile = require('../models/profileModels');
const bcrypt = require('bcryptjs');
const domain = "http://localhost:5000";

// Route to add a doctor (only accessible by admin)
const registerDoctor = async(req, res) => {
  const { email, password, firstName, lastName, age, gender, phone, address, speciality, qualification, experience, profileImage } = req.body;

  try {
    // Create new user
    const user = new User({
      email,
      password,
      role: 'doctor'
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
      qualification,
      experience,
      speciality,
      profileImage
    });
    await profile.save();

    res.status(201).json({ message: 'Patient registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering patient', error: error.message });
  }
};

//get Patients 
const getDoctors = async (req, res) => {
  try {
    // Aggregate data from both collections
    const users = await User.find({ role: 'doctor' }); // or use any query you need
    const profiles = await Profile.find(); // or use any query you need

    // Combine data
    const combinedData = users.map(user => {
      const profile = profiles.find(p => p.userId.toString() === user._id.toString());
      return {
        ...user._doc,
        ...profile?._doc
      };
    });

    res.status(200).json({ doctors: combinedData });
  } catch (error) {
    console.error('Error fetching doctors:', error.message);
    res.status(500).json({ msg: 'Error fetching doctors', error: error.message });
  }
}

// const getDoctorById = async (req, res) => {
//   try {
//     const doctorId = req.params.doctorId;

//     // Find the user with the specified ID and role 'doctor'
//     const user = await User.findById(doctorId);
//     const profile = await Profile.findOne({ userId: doctorId });

//     if (!user) {
//       return res.status(404).json({ msg: 'Doctor not found' });
//     }

//     // Combine user and profile data
//     const doctorData = {
//       ...user._doc,
//       ...profile?._doc
//     };

//     res.status(200).json({ doctor: doctorData });
//   } catch (error) {
//     console.error('Error fetching doctor:', error.message);
//     res.status(500).json({ msg: 'Error fetching doctor', error: error.message });
//   }
// };

const getDoctorById = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const user = await User.findById(doctorId);
    const profile = await Profile.findOne({ userId: doctorId }).populate('userId');

    if (!user || !profile) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({
      userData: {
        email: user.email,
        
      },
      profileData: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        bio: profile.bio,
        age: profile.age,
        gender: profile.gender,
        contact: profile.contact,
        profileImage: profile.profileImage,
        speciality: profile.speciality,
        qualification: profile.qualification,
        experience: profile.experience
      }
    });
  } catch (error) {
    console.error('Error fetching doctor:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update patient data
const updateDoctor = async (req, res) => {
  const doctorId = req.params.doctorId;
  const { firstName, lastName, email, age, gender, phone, address, speciality, bio, qualification, experience } = req.body;

  try {
    // Update user data
    let updateUserData = { email}
    const updatedUser = await User.findByIdAndUpdate(
      doctorId,
      updateUserData,
      { new: true }
    );

    if(!updatedUser){
      res.status(404).json({msg:"doctor userid is not found"})
    }
    
    let updateData = { speciality, qualification, experience,age, gender, bio, firstName, lastName};
    updateData.contact = {
      phone: phone, 
      address: address
    }
    
    
    if (req.file) {
      updateData.profileImage = `${domain}/uploads/profiles/${req.file.filename}`;
    }

    
    // Update profile data
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: doctorId },
      updateData,
      { new: true }
    );

    if ( !updatedProfile) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }

    res.status(200).json({
      msg: 'Doctor updated successfully',
      doctor: {updatedUser, profile: updatedProfile },
      sucess: true
    });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ msg: 'Error updating doctor', error: error.message });
  }
};

// const updateDoctor = async (req, res) => {
//   const { doctorId } = req.params;
//   const { userData, profileData } = req.body;

//   try {
//     const user = {
//       name: userData.name,
//       email: userData.email,
//       speciality: userData.speciality,
//       qualifications: userData.qualification,
//       experience: userData.experience
//     };

//     const updatedUser = await User.findByIdAndUpdate(doctorId, user, { new: true });

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'Doctor user not found' });
//     }

//     // Prepare profile update data
//     const profile = {
//       bio: profileData.bio,
//       age: profileData.age,
//       gender: profileData.gender,
//       contact: {
//         phone: profileData.phone,
//         address: profileData.address
//       }
//     };

//     // If an image is uploaded, add it to the updateData
//     if (req.file) {
//       profile.profileImage = `${domain}/uploads/profiles/${req.file.filename}`;
//     }

//     // Update the profile data
//     const updatedProfile = await Profile.findOneAndUpdate({ userId: doctorId }, profile, { new: true });

//     if (!updatedProfile) {
//       return res.status(404).json({ message: 'Doctor profile not found' });
//     }

//     res.status(200).json({ message: 'Doctor updated successfully', profile });
//   }catch (error) {
//     console.error('Error updating doctor:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// Update patient data
const updateDoctorbyPst = async (req, res) => {
  const doctorId = req.params.id;
  const { name, email, age, gender, phone, address, speciality, bio, qualification, experience } = req.body;

  try {
    // Update user data
    let updateUserData = {name, email, speciality, qualification, experience}
    const updatedUser = await User.findByIdAndUpdate(
      doctorId,
      updateUserData,
      { new: true }
    );

    if(!updatedUser){
      res.status(404).json({msg:"doctor userid is not found"})
    }
    
    let updateData = {age, gender, bio};
    updateData.contact = {
      phone: phone, 
      address: address
    }
    
    
    if (req.file) {
      updateData.profileImage = `${domain}/uploads/profiles/${req.file.filename}`;
    }

    
    // Update profile data
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: doctorId },
      updateData,
      { new: true }
    );

    if ( !updatedProfile) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }

    res.status(200).json({
      msg: 'Doctor updated successfully',
      doctor: {updatedUser, profile: updatedProfile },
      sucess: true
    });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ msg: 'Error updating doctor', error: error.message });
  }
};
// const updateDoctorbyPst = async (req, res) => {
//   const doctorId = req.params.id;
//   const { userData, profileData } = req.body;

//   try {
//     const user = {
//       name: userData.name,
//       email: userData.email,
//       speciality: userData.speciality,
//       qualifications: userData.qualification,
//       experience: userData.experience
//     };

//     const updatedUser = await User.findByIdAndUpdate(doctorId, user, { new: true });

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'Doctor user not found' });
//     }

//     // Prepare profile update data
//     const profile = {
//       bio: profileData.bio,
//       age: profileData.age,
//       gender: profileData.gender,
//       contact: {
//         phone: profileData.phone,
//         address: profileData.address
//       }
//     };

//     // If an image is uploaded, add it to the updateData
//     if (req.file) {
//       profile.profileImage = `${domain}/uploads/profiles/${req.file.filename}`;
//     }

//     // Update the profile data
//     const updatedProfile = await Profile.findOneAndUpdate({ userId: doctorId }, profile, { new: true });

//     if (!updatedProfile) {
//       return res.status(404).json({ message: 'Doctor profile not found' });
//     }

//     res.status(200).json({ message: 'Doctor updated successfully', profile });
//   }catch (error) {
//     console.error('Error updating doctor:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// // Get all doctors
// const getDoctors = async (req, res) => {
//   try {
//     const doctors = await User.find({ role: 'doctor' });
//     res.status(200).json(doctors);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };




module.exports = {
  registerDoctor, 
  updateDoctor,   
  getDoctors,
  getDoctorById,
  updateDoctorbyPst
};
