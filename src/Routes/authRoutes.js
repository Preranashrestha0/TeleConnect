const express = require('express');
const { registerUser, loginUser, getPatient, getPatientById, updatePatient } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const {authorizeRole} = require('../middleware/authorizationMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/loginUser', loginUser);
// router.get('/patient', getPatient);
// router.get('/:patientId', getPatientById);
// router.put('/:patientId', updatePatient);

module.exports = router;