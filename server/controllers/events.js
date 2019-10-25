const eventRoutes = require('express').Router();
const Event = require('../models/Event');

eventRoutes.get('', (req, res) => {
  Event.find({}).then(events => {
    res.json(events.map(event => event.toJSON()));
  });
});

eventRoutes.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      res.json(event.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (error) {
    return next(error);
  }
});

eventRoutes.post('', async (req, res, next) => {
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
    return next(error);
  }
});

eventRoutes.delete('/:id', (req, res, next) => {
  Event.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = eventRoutes;
