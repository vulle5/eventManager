const eventsRoutes = require('express').Router();
const Event = require('../models/Event');
const User = require('../models/User');
const Location = require('../models/Location');

eventsRoutes.get('', async (req, res) => {
  const events = await Event.find({})
    .populate('organizer', {
      name: 1,
      username: 1
    })
    .populate('location', { name: 1, address: 1, phoneNum: 1, webUrl: 1 });
  res.json(events.map(event => event.toJSON()));
});

eventsRoutes.get('/:id', async (req, res, next) => {
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

eventsRoutes.post('', async (req, res, next) => {
  const body = req.body;

  try {
    const user = await User.findById(body.userId);
    const location = await Location.findById(body.locationId);

    const event = new Event({
      name: body.name,
      startDate: body.startDate,
      endDate: body.endDate,
      description: body.description || '',
      organizer: user._id,
      location: location._id
    });
    const savedEvent = await event.save();
    user.events = user.events.concat(savedEvent._id);
    location.events = location.events.concat(savedEvent._id);
    await user.save();
    await location.save();
    res.status(201).json(savedEvent.toJSON());
  } catch (error) {
    return next(error);
  }
});

eventsRoutes.delete('/:id', async (req, res, next) => {
  try {
    await Event.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    return next(error);
  }
});

eventsRoutes.put('/:id', async (req, res, next) => {
  const body = req.body;

  try {
    const oldEvent = await Event.findById(req.params.id);

    const newEvent = {
      name: body.name || oldEvent.name,
      startDate: body.startDate || oldEvent.startDate,
      endDate: body.endDate || oldEvent.endDate,
      description: body.description || oldEvent.description
    };

    const event = await Event.findByIdAndUpdate(req.params.id, newEvent, {
      new: true
    });
    res.json(event.toJSON());
  } catch (error) {
    return next(error);
  }
});

module.exports = eventsRoutes;
