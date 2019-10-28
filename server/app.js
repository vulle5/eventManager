require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  errorHandler,
  unknownEndpoint,
  authentication
} = require('./utils/middleware');
const eventRoutes = require('./controllers/events');
const locationRoutes = require('./controllers/locations');
const userRoutes = require('./controllers/users');
const participationRoutes = require('./controllers/participations');
const loginRoutes = require('./controllers/login');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });

// Pre-request middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', authentication);
// Routes
app.use('/api/events', eventRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/participations', participationRoutes);
app.use('/auth/login', loginRoutes);
// Post-request middleware
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
