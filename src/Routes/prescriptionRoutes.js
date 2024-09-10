const express = require('express');
const { addPrescription, getPrescription, getPrescriptionsForPatient } = require('../controllers/prescriptionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', addPrescription);
router.get('/doctor/:doctorId', getPrescription);
router.get('/patient/:patientId', authMiddleware, getPrescriptionsForPatient);

module.exports = router;
