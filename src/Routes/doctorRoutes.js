const express = require('express');
const {
    registerDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctors,
    getDoctorById,
    updateDoctorbyPst
  } = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');
const {authorizeRole} = require('../middleware/authorizationMiddleware');
const { profileImage } = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/registerDoctor',  registerDoctor);

router.get('/get/:doctorId',  getDoctorById);

router.get('/doctor', getDoctors);

router.put('/update/:doctorId', authMiddleware, authorizeRole('admin', 'doctor'), profileImage.single('profileImage'), updateDoctor);


router.put('/updatedoc/:id',  authMiddleware, authorizeRole('admin'), profileImage.single('profileImage'), updateDoctorbyPst  );


module.exports = router;