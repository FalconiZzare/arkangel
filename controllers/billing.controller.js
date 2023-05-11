const { validationResult } = require('express-validator');
const db = require('../db');
const moment = require('moment');

exports.addBilling = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { patient_id, appointment_id, amount, payment_date } = req.body;

  try {
    const patientId = await db.executeQuery(`
        SELECT id
        FROM patients
        WHERE id = '${patient_id}'
    `);

    if (patientId?.length <= 0) {
      return res.status(400).json({
        message: 'No Patient found with the given ID!',
        success: false,
        data: {}
      });
    }

    const appointmentId = await db.executeQuery(`
        SELECT id
        FROM appointments
        WHERE id = '${appointment_id}'
    `);

    if (appointmentId?.length <= 0) {
      return res.status(400).json({
        message: 'No Appointment found with the given ID!',
        success: false,
        data: {}
      });
    }

    await db.executeQuery(`
        INSERT INTO billings (patient_id,
                              appointment_id,
                              amount,
                              payment_date)
        values ('${patient_id}',
                '${appointment_id}',
                '${amount}',
                '${moment(payment_date).format('YYYY-MM-DD')}')
    `);

    res.status(200).json({
      message: 'Bill created successfully!',
      success: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

exports.updateBilling = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { patient_id, appointment_id, amount, payment_date } = req.body;

  try {
    const appointmentId = await db.executeQuery(`
        SELECT id
        FROM appointments
        WHERE id = '${appointment_id}'
    `);

    if (appointmentId?.length <= 0) {
      return res.status(400).json({
        message: 'No Appointment found with the given ID!',
        success: false,
        data: {}
      });
    }

    const billId = await db.executeQuery(`
        SELECT id
        FROM billings
        WHERE id = '${req.params.id}'
    `);

    if (billId?.length <= 0) {
      return res.status(400).json({
        message: 'No Bill found!',
        success: false,
        data: {}
      });
    }

    const patientId = await db.executeQuery(`
        SELECT id
        FROM patients
        WHERE id = '${patient_id}'
    `);

    if (patientId?.length <= 0) {
      return res.status(400).json({
        message: 'No Patient found with the given ID!',
        success: false,
        data: {}
      });
    }

    await db.executeQuery(`
        UPDATE billings
        SET patient_id     = '${patient_id}',
            appointment_id = '${appointment_id}',
            amount         = '${amount}',
            payment_date   = '${moment(payment_date).format('YYYY-MM-DD')}'
        WHERE id = '${req.params.id}'
    `);

    res.status(200).json({
      message: 'Bill updated successfully!',
      success: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

exports.getBillings = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  try {
    const billings = await db.executeQuery(`
        SELECT b.patient_id,
               b.id,
               p.first_name as patient_name,
               a.id         as appointment_id,
               payment_date,
               amount
        FROM billings as b,
             patients as p,
             appointments as a
        WHERE b.patient_id = p.id
          AND b.appointment_id = a.id
    `);

    if (billings.length <= 0) {
      return res.status(400).json({
        message: 'No Bill found!',
        success: false,
        data: {}
      });
    }

    return res.status(200).json({
      message: 'Get Bill List Successful!',
      success: true,
      data: billings
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

exports.deleteBilling = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  try {
    const billingId = await db.executeQuery(`
        SELECT id
        FROM billings
        WHERE id = '${req.params.id}'
    `);

    if (billingId?.length <= 0) {
      return res.status(400).json({
        message: 'No Bill found!',
        success: false,
        data: {}
      });
    }

    await db.executeQuery(`
        DELETE
        FROM billings
        WHERE id = '${req.params.id}'
    `);

    res.status(200).json({
      message: 'Bill deleted successfully!',
      success: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};
