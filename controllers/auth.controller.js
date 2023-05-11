const { validationResult } = require('express-validator');
const db = require('../db');

exports.addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { username, email, password } = req.body;

  try {
    const userFound = await db.executeQuery(`
        SELECT username
        from users
        where username = '${username}'
    `);

    if (userFound?.length > 0) {
      return res.status(400).json({
        message: 'A user already exists with this username!',
        success: false,
        data: {}
      });
    }

    const emailFound = await db.executeQuery(`
        SELECT email
        from users
        where email = '${email}'
    `);

    if (emailFound?.length > 0) {
      return res.status(400).json({
        message: 'A user already exists with this email!',
        success: false,
        data: {}
      });
    }

    await db.executeQuery(`
        INSERT INTO users (username, password, email)
        values ('${username}', '${password}', '${email}')
    `);

    res.status(200).json({
      message: 'User created successfully!',
      success: true
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

exports.postLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { username, password } = req.body;

  try {
    const user = await db.executeQuery(`
        SELECT *
        FROM users
        WHERE username = '${username}'
    `);

    if (user?.length <= 0) {
      return res.status(400).json({
        message: 'No user found!',
        success: false,
        data: {}
      });
    }

    if (user[0].password === password) {
      delete user[0].password;

      return res.status(200).json({
        message: 'Login successful!',
        success: true,
        data: user[0]
      });
    } else
      return res.status(400).json({
        message: 'Invalid credentials!',
        success: false,
        data: {}
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};
