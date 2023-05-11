const express = require('express');
const { body } = require('express-validator');
const billingControllers = require('../controllers/billing.controller');

const router = express.Router();

// @route   POST api/billing/add
// @desc    POST create a bill
// @access  Public
router.post(
  '/add',
  [
    body('patient_id', 'Patient ID can not be empty!').trim().not().isEmpty(),
    body('appointment_id', 'Appointment ID can not be empty!').trim().not().isEmpty(),
    body('amount', 'Amount can not be empty!').trim().not().isEmpty(),
    body('payment_date', 'Payment Date can not be empty!').trim().not().isEmpty()
  ],
  billingControllers.addBilling
);

// @route   POST api/billing/update/:id
// @desc    POST update a bill
// @access  Public
router.put(
  '/update/:id',
  [
    body('patient_id', 'Patient ID can not be empty!').trim().not().isEmpty(),
    body('appointment_id', 'Appointment ID can not be empty!').trim().not().isEmpty(),
    body('amount', 'Amount can not be empty!').trim().not().isEmpty(),
    body('payment_date', 'Payment Date can not be empty!').trim().not().isEmpty()
  ],
  billingControllers.updateBilling
);

// @route   GET api/billing/list
// @desc    GET billing list
// @access  Public
router.get('/list', billingControllers.getBillings);

// @route   DELETE api/billing/delete/:id
// @desc    DELETE delete a bill
// @access  Public
router.delete('/delete/:id', billingControllers.deleteBilling);

module.exports = router;
