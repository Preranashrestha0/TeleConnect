const express = require('express');
const router = express.Router();
// const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const {authorizeRole} = require('../middleware/authorizationMiddleware');
const { getPatientById, getPatient, updatePatient, registerPatient, getProfile, getMedicalHistory } = require('../controllers/PatientController');
const { profileImage } = require('../middleware/uploadMiddleware');

router.post('/registerPatient', registerPatient);

router.get('/get/:patientId',  getPatientById);

router.get('/:id/medical-history', getMedicalHistory);


router.get('/patient', getPatient);

router.put('/update/:patientId', profileImage.single('profileImage'), updatePatient);


// router.put('/updatedoc/:id',  authMiddleware, authorizeRole('admin'), profileImage.single('profileImage'), updateDoctorbyPst  );


module.exports = router;
