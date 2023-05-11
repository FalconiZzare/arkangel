const { validationResult } = require('express-validator');
const db = require('../db');
const moment = require('moment');

exports.addDoctor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { id, first_name, last_name, speciality } = req.body;

  try {
    const doctorId = await db.executeQuery(`
        SELECT id
        from doctors
        where id = '${id}'
    `);

    if (doctorId?.length > 0) {
      return res.status(400).json({
        message: 'A doctor already exists with this ID!',
        success: false,
        data: {}
      });
    }

    await db.executeQuery(`
        INSERT INTO doctors (id,
                             first_name,
                             last_name,
                             speciality)
        values ('${id}',
                '${first_name}',
                '${last_name}',
                '${speciality}')
    `);

    res.status(200).json({
      message: 'Doctor created successfully!',
      success: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

exports.updateDoctor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { id, first_name, last_name, speciality } = req.body;

  try {
    const doctorId = await db.executeQuery(`
        SELECT id
        from doctors
        where id = '${req.params.id}'
    `);

    if (doctorId?.length <= 0) {
      return res.status(400).json({
        message: 'No Doctor found!',
        success: false,
        data: {}
      });
    }

    await db.executeQuery(`
        UPDATE doctors
        SET id         = '${id}',
            first_name = '${first_name}',
            last_name  = '${last_name}',
            speciality = '${speciality}'
        WHERE id = '${req.params.id}'
    `);

    res.status(200).json({
      message: 'Doctor updated successfully!',
      success: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

exports.deleteDoctor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  try {
    const doctorId = await db.executeQuery(`
        SELECT id
        FROM doctors
        where id = '${req.params.id}'
    `);

    if (doctorId?.length <= 0) {
      return res.status(400).json({
        message: 'No Doctor found!',
        success: false,
        data: {}
      });
    }

    await db.executeQuery(`
        DELETE
        FROM doctors
        WHERE id = '${req.params.id}'
    `);

    res.status(200).json({
      message: 'Doctor deleted successfully!',
      success: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

exports.getDoctors = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  try {
    const doctors = await db.executeQuery(`
        SELECT *
        FROM doctors
    `);

    if (doctors.length <= 0) {
      return res.status(400).json({
        message: 'No Doctor found!',
        success: false,
        data: {}
      });
    }

    return res.status(200).json({
      message: 'Get Doctor List Successful!',
      success: true,
      data: doctors
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};
