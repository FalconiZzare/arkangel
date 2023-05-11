const { validationResult } = require('express-validator');
const db = require('../db');
const moment = require('moment');

exports.addPatient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { id, first_name, last_name, gender, date_of_birth, phone_number, address } = req.body;

  try {
    const patientId = await db.executeQuery(`
        SELECT id
        from patients
        where id = '${id}'
    `);

    if (patientId?.length > 0) {
      return res.status(400).json({
        message: 'A patient already exists with this ID!',
        success: false,
        data: {}
      });
    }

    if (gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female') {
      return res.status(400).json({
        message: 'Patient Gender must be either Male or Female',
        success: false,
        data: {}
      });
    }

    await db.executeQuery(`
        INSERT INTO patients (id,
                              first_name,
                              last_name,
                              gender,
                              date_of_birth,
                              phone_number,
                              address)
        values ('${id}',
                '${first_name}',
                '${last_name}',
                '${gender}',
                '${moment(date_of_birth).format('YYYY-MM-DD')}',
                '${phone_number}',
                '${address}')
    `);

    res.status(200).json({
      message: 'Patient created successfully!',
      success: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

exports.updatePatient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { id, first_name, last_name, gender, date_of_birth, phone_number, address } = req.body;

  try {
    const patientId = await db.executeQuery(`
        SELECT id
        from patients
        where id = '${req.params.id}'
    `);

    if (patientId?.length <= 0) {
      return res.status(400).json({
        message: 'No Patient found!',
        success: false,
        data: {}
      });
    }

    if (gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female') {
      return res.status(400).json({
        message: 'Patient Gender must be either Male or Female',
        success: false,
        data: {}
      });
    }

    await db.executeQuery(`
        UPDATE patients
        SET id            = '${id}',
            first_name    = '${first_name}',
            last_name     = '${last_name}',
            gender        = '${gender}',
            date_of_birth = '${moment(date_of_birth).format('YYYY-MM-DD')}',
            phone_number  = '${phone_number}',
            address       = '${address}'
        WHERE id = '${req.params.id}'
    `);

    res.status(200).json({
      message: 'Patient updated successfully!',
      success: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

exports.deletePatient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  try {
    const patientId = await db.executeQuery(`
        SELECT id
        from patients
        where id = '${req.params.id}'
    `);

    if (patientId?.length <= 0) {
      return res.status(400).json({
        message: 'No Patient found!',
        success: false,
        data: {}
      });
    }

    await db.executeQuery(`
        DELETE
        FROM patients
        WHERE id = '${req.params.id}'
    `);

    res.status(200).json({
      message: 'Patient deleted successfully!',
      success: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

exports.getPatients = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  try {
    const patients = await db.executeQuery(`
        SELECT *
        FROM patients
    `);

    if (patients.length <= 0) {
      return res.status(400).json({
        message: 'No Patient found!',
        success: false,
        data: {}
      });
    }

    return res.status(200).json({
      message: 'Get Patient List Successful!',
      success: true,
      data: patients
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};
