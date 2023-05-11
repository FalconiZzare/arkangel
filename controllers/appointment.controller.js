const { validationResult } = require('express-validator');
const db = require('../db');
const moment = require('moment');

exports.addAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { patient_id, doctor_id, appointment_date } = req.body;

  try {
    const patientId = await db.executeQuery(`
        SELECT id
        from patients
        where id = '${patient_id}'
    `);

    if (patientId?.length <= 0) {
      return res.status(400).json({
        message: 'No Patient found with the given ID!',
        success: false,
        data: {}
      });
    }

    const doctorId = await db.executeQuery(`
        SELECT id
        from doctors
        where id = '${doctor_id}'
    `);

    if (doctorId?.length <= 0) {
      return res.status(400).json({
        message: 'No Doctor found with the given ID!',
        success: false,
        data: {}
      });
    }

    await db.executeQuery(`
        INSERT INTO appointments (patient_id,
                                  doctor_id,
                                  appointment_date)
        values ('${patient_id}',
                '${doctor_id}',
                '${moment(appointment_date).format('YYYY-MM-DD hh:mm:ss')}')
    `);

    res.status(200).json({
      message: 'Appointment created successfully!',
      success: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

exports.updateAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { patient_id, doctor_id, appointment_date } = req.body;

  try {
    const patientId = await db.executeQuery(`
        SELECT id
        from patients
        where id = '${patient_id}'
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
        WHERE id = '${req.params.id}'
    `);

    if (appointmentId?.length <= 0) {
      return res.status(400).json({
        message: 'No Appointment found!',
        success: false,
        data: {}
      });
    }

    const doctorId = await db.executeQuery(`
        SELECT id
        from doctors
        where id = '${doctor_id}'
    `);

    if (doctorId?.length <= 0) {
      return res.status(400).json({
        message: 'No Doctor found with the given ID!',
        success: false,
        data: {}
      });
    }

    await db.executeQuery(`
        UPDATE appointments
        SET patient_id       = '${patient_id}',
            doctor_id        = '${doctor_id}',
            appointment_date = '${moment(appointment_date).format('YYYY-MM-DD hh:mm:ss')}'
        WHERE id = '${req.params.id}'
    `);

    res.status(200).json({
      message: 'Appointment updated successfully!',
      success: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

exports.getAppointments = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  try {
    const appointments = await db.executeQuery(`
        SELECT appointment_date,
               a.patient_id,
               a.doctor_id,
               a.id         as appointment_id,
               p.first_name as patient_name,
               d.first_name as doctor_name
        FROM appointments as a,
             patients as p,
             doctors as d
        WHERE a.patient_id = p.id
          AND a.doctor_id = d.id
    `);

    if (appointments.length <= 0) {
      return res.status(400).json({
        message: 'No Appointment found!',
        success: false,
        data: {}
      });
    }

    return res.status(200).json({
      message: 'Get Patient List Successful!',
      success: true,
      data: appointments
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

exports.deleteAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  try {
    const appointmentId = await db.executeQuery(`
        SELECT id
        FROM appointments
        WHERE id = '${req.params.id}'
    `);

    if (appointmentId?.length <= 0) {
      return res.status(400).json({
        message: 'No Appointment found!',
        success: false,
        data: {}
      });
    }

    await db.executeQuery(`
        DELETE
        FROM appointments
        WHERE id = '${req.params.id}'
    `);

    res.status(200).json({
      message: 'Appointment deleted successfully!',
      success: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};
