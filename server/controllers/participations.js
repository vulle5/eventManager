const participationsRoutes = require('express').Router();
const Participation = require('../models/Participation');
const User = require('../models/User');
const Event = require('../models/Event');

participationsRoutes.get('', async (req, res) => {
  const participations = await Participation.find({})
    .populate('participant', {
      name: 1,
      username: 1
    })
    .populate('event', { name: 1, startDate: 1, endDate: 1 });
  res.json(participations.map(participation => participation.toJSON()));
});

participationsRoutes.get('/:id', async (req, res, next) => {
  try {
    const participation = await Participation.findById(req.params.id);

    if (participation) {
      res.json(participation.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (error) {
    return next(error);
  }
});

participationsRoutes.post('', async (req, res, next) => {
  const body = req.body;

  // TODO: Make sure that only the user can creat a participation
  try {
    const user = await User.findById(body.userId);
    const event = await Event.findById(body.eventId);

    const participation = new Participation({
      participant: user._id,
      event: event._id,
      type: body.type
    });

    const savedParticipation = await participation.save();
    user.participations = user.participations.concat(savedParticipation._id);
    event.participants = event.participants.concat(savedParticipation._id);
    await user.save();
    await event.save();
    res.status(201).json(savedParticipation.toJSON());
  } catch (error) {
    return next(error);
  }
});

participationsRoutes.delete('/:id', async (req, res, next) => {
  // TODO: Make sure that only the user can delete a participation
  try {
    await Participation.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    return next(error);
  }
});

participationsRoutes.put('/:id', async (req, res, next) => {
  const body = req.body;

  // TODO: Make sure that only organizer can update the location
  try {
    const oldParticipation = await Participation.findById(req.params.id);

    const newParticipation = {
      participant: oldParticipation.participant,
      event: oldParticipation.event,
      type: body.type || oldParticipation.type
    };

    const participation = await Participation.findByIdAndUpdate(
      req.params.id,
      newParticipation,
      {
        new: true
      }
    );
    res.json(participation.toJSON());
  } catch (error) {
    return next(error);
  }
});

module.exports = participationsRoutes;
