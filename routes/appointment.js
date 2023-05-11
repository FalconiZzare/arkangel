const express = require('express');
const { body } = require('express-validator');
const appointmentControllers = require('../controllers/appointment.controller');

const router = express.Router();

// @route   POST api/appointment/add
// @desc    POST create an appointment
// @access  Public
router.post(
  '/add',
  [
    body('patient_id', 'Patient ID can not be empty!').trim().not().isEmpty(),
    body('doctor_id', 'Doctor ID can not be empty!').trim().not().isEmpty(),
    body('appointment_date', 'Appointment Date can not be empty!').trim().not().isEmpty()
  ],
  appointmentControllers.addAppointment
);

// @route   POST api/appointment/update/:id
// @desc    POST update an appointment
// @access  Public
router.put(
  '/update/:id',
  [
    body('patient_id', 'Patient ID can not be empty!').trim().not().isEmpty(),
    body('doctor_id', 'Doctor ID can not be empty!').trim().not().isEmpty(),
    body('appointment_date', 'Appointment Date can not be empty!').trim().not().isEmpty()
  ],
  appointmentControllers.updateAppointment
);

// @route   GET api/appointment/list
// @desc    GET appointment list
// @access  Public
router.get('/list', appointmentControllers.getAppointments);

// @route   DELETE api/appointment/delete/:id
// @desc    DELETE delete an appointment
// @access  Public
router.delete('/delete/:id', appointmentControllers.deleteAppointment);

module.exports = router;
