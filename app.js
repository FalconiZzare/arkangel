const express = require('express');
const bodyparser = require('body-parser');
const http = require('http');
const path = require('path');
const multer = require('multer');

//ROUTE IMPORTS
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patient');
const doctorRoutes = require('./routes/doctor');
const appointmentRoutes = require('./routes/appointment');
const billingRoutes = require('./routes/billing');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    if (file.mimetype.includes('sheet') || file.mimetype.includes('excel')) {
      cb(null, file.originalname.replace(/ /g, '_').toLowerCase());
    } else {
      cb(
        null,
        new Date().toISOString().replace(/:/g, '-') +
          '-' +
          file.originalname.replace(/ /g, '_').toLowerCase()
      );
    }
  }
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(multer({ storage: fileStorage }).array('images', 5));

app.use(express.static('views'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/billing', billingRoutes);

app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

http.createServer(app).listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
