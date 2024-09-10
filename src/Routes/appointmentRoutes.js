const express=require('express');
const userProfile = require('../controllers/usersController');
const { getAppointments, addAppointments, updateAppointment, deleteAppointments, getAppointmentsPatient, getAppointmentsDoctor } = require('../controllers/appointmentController');
const router=express.Router();

router.get('/patient/:patientId', getAppointmentsPatient)

router.get('/doctor/:doctorId', getAppointmentsDoctor)

router.post('/appointments', addAppointments)

router.put('/:id', updateAppointment)

router.delete('/:id', deleteAppointments)

module.exports=router;