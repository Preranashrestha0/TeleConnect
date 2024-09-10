const User = require('../models/authUserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Profile  = require('../models/profileModels');
const domain = "http://localhost:5000";

dotenv.config();

const registerUser = async (req, res) => {
  const { name, email, password, bio, age, gender, phone, address } = req.body;

  try {
    // Check if email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already in use' });
    }

    const newPatient = new User({
      name,
      email,
      password,
      role: 'patient'
    });
    const savedPatient = await newPatient.save();

    //create profile for the new user
    const patientProfile = new Profile({
      userId: savedPatient._id,
      bio,
      age,
      gender,
      contact: { phone, address }
    });
    await patientProfile.save();

    res.status(201).json({
      msg: "User registered successfully",
      existingUser:savedPatient,
      Profile: patientProfile,
    });
  } catch (err) {
    console.error(err.message);
    // res.status(500).send(err.message);
    res.status(500).send('Server error');
  }
};
const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (user.role !== role) {
      return res.status(400).json({ msg: 'Invalid role' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: "User logged in successfully",
          token: `Bearer ${token}`,
          user: user,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



// Get patient by ID
const getPatientById = async (req, res) => {
  const patientId = req.params.patientId;

  try {
    // Fetch user and profile data
    const user = await User.findById(patientId);
    const profile = await Profile.findOne({ userId: patientId });

    if (!user || !profile) {
      return res.status(404).json({ msg: 'Patient not found' });
    }

    // Combine user and profile data
    const patientData = {
      ...user._doc,
      profile: profile
    };

    res.status(200).json({ patient: patientData });
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ msg: 'Error fetching patient', error: error.message });
  }
};

// Update patient data
const updatePatient = async (req, res) => {
  const patientId = req.params.patientId;
  const { name, email, age, gender, phone, address, medicalHistory, bio, profilePicture } = req.body;

  try {
    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      patientId,
      { name, email, age, gender, phone, address},
      { new: true }
    );
    if (req.file) {
      const profilePicture = `${domain}/uploads/profiles/${req.file.filename}`;
      updatedUser.profilePicture = profilePicture;
    }

    // Update profile data
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: patientId },
      { bio, contact: { phone, address }, medicalHistory, profilePicture },
      { new: true }
    );

    if (!updatedUser || !updatedProfile) {
      return res.status(404).json({ msg: 'Patient not found' });
    }

    res.status(200).json({
      msg: 'Patient updated successfully',
      patient: { ...updatedUser._doc, profile: updatedProfile }
    });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ msg: 'Error updating patient', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};