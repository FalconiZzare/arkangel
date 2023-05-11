const express = require('express');
const { body } = require('express-validator');
const doctorControllers = require('../controllers/doctor.controller');

const router = express.Router();

// @route   POST api/doctor/add
// @desc    POST create a doctor
// @access  Public
router.post(
  '/add',
  [
    body('id', 'Doctor ID can not be empty!').trim().not().isEmpty(),
    body('first_name', 'Doctor First Name can not be empty!').trim().not().isEmpty(),
    body('last_name', 'Doctor Last Name can not be empty!').trim().not().isEmpty(),
    body('speciality').trim()
  ],
  doctorControllers.addDoctor
);

// @route   PUT api/doctor/update/:id
// @desc    PUT update a doctor
// @access  Public
router.put(
  '/update/:id',
  [
    body('id', 'Doctor ID can not be empty!').trim().not().isEmpty(),
    body('first_name', 'Doctor First Name can not be empty!').trim().not().isEmpty(),
    body('last_name', 'Doctor Last Name can not be empty!').trim().not().isEmpty(),
    body('speciality').trim()
  ],
  doctorControllers.updateDoctor
);

// @route   DELETE api/doctor/delete/:id
// @desc    DELETE delete a doctor
// @access  Public
router.delete('/delete/:id', doctorControllers.deleteDoctor);

// @route   GET api/doctor/list
// @desc    GET doctor list
// @access  Public
router.get('/list', doctorControllers.getDoctors);

module.exports = router;
