require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errorHandler, unknownEndpoint } = require('./utils/middleware');
const eventsRoutes = require('./controllers/events');
const locationsRoutes = require('./controllers/locations');
const usersRoutes = require('./controllers/users');

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
// Routes
app.use('/api/events', eventsRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/users', usersRoutes);
// Post-request middleware
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
