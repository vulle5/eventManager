const eventRoutes = require('express').Router();
const Event = require('../models/Event');

eventRoutes.get('', (req, res) => {
  Event.find({}).then(events => {
    res.json(events.map(event => event.toJSON()));
  });
});

module.exports = eventRoutes;
