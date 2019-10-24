const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const eventRoutes = require('./controllers/events');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/events', eventRoutes);

module.exports = app;
