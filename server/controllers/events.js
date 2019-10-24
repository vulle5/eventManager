const eventRoutes = require('express').Router();
const Event = require('../models/Event');

eventRoutes.get('', (req, res) => {
  Event.find({}).then(events => {
    res.json(events.map(event => event.toJSON()));
  });
});

eventRoutes.post('', async (req, res) => {
  const body = req.body;

  try {
    const event = new Event({
      name: body.name,
      startDate: body.startDate,
      endDate: body.endDate,
      description: body.description || ''
    });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent.toJSON());
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = eventRoutes;
