const express = require('express');
const { body } = require('express-validator');
const patientControllers = require('../controllers/patient.controller');

const router = express.Router();

// @route   POST api/patient/add
// @desc    POST create a patient
// @access  Public
router.post(
  '/add',
  [
    body('id', 'Patient ID can not be empty!').trim().not().isEmpty(),
    body('first_name', 'Patient First Name can not be empty!').trim().not().isEmpty(),
    body('last_name', 'Patient Last Name can not be empty!').trim().not().isEmpty(),
    body('gender', 'Patient Gender can not be empty!').trim().not().isEmpty(),
    body('date_of_birth', 'Patient DoB can not be empty!').trim().not().isEmpty(),
    body('phone_number').trim(),
    body('address').trim()
  ],
  patientControllers.addPatient
);

// @route   PUT api/patient/update/:id
// @desc    PUT update a patient
// @access  Public
router.put(
  '/update/:id',
  [
    body('id', 'Patient ID can not be empty!').trim().not().isEmpty(),
    body('first_name', 'Patient First Name can not be empty!').trim().not().isEmpty(),
    body('last_name', 'Patient Last Name can not be empty!').trim().not().isEmpty(),
    body('gender', 'Patient Gender can not be empty!').trim().not().isEmpty(),
    body('date_of_birth', 'Patient DoB can not be empty!').trim().not().isEmpty(),
    body('phone_number').trim(),
    body('address').trim()
  ],
  patientControllers.updatePatient
);

// @route   DELETE api/patient/delete/:id
// @desc    DELETE delete a patient
// @access  Public
router.delete('/delete/:id', patientControllers.deletePatient);

// @route   GET api/patient/list
// @desc    GET patient list
// @access  Public
router.get('/list', patientControllers.getPatients);

module.exports = router;
