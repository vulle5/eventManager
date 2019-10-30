const participationRoutes = require('express').Router();
const Participation = require('../models/Participation');
const User = require('../models/User');
const Event = require('../models/Event');

participationRoutes.get('', async (req, res) => {
  const participations = await Participation.find({})
    .populate('participant', {
      name: 1,
      username: 1
    })
    .populate('event', { name: 1, startDate: 1, endDate: 1 });
  res.json(participations.map(participation => participation.toJSON()));
});

participationRoutes.get('/:id', async (req, res, next) => {
  try {
    const participation = await Participation.findById(req.params.id)
      .populate('participant', {
        name: 1,
        username: 1
      })
      .populate('event', { name: 1, startDate: 1, endDate: 1 });

    if (participation) {
      res.json(participation.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (error) {
    return next(error);
  }
});

participationRoutes.post('', async (req, res, next) => {
  const body = req.body;

  try {
    const user = await User.findById(req.user.id);
    const event = await Event.findById(body.eventId).populate('participants');

    if (
      event.participants.some(
        ({ participant }) => participant.toString() === req.user.id
      )
    ) {
      res.status(400).send({ error: 'Already participated' });
    } else {
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
    }
  } catch (error) {
    return next(error);
  }
});

participationRoutes.delete('/:id', async (req, res, next) => {
  try {
    const participation = await Participation.findById(req.params.id).populate(
      'participant'
    );

    if (participation.participant.id === req.user.id) {
      await Participation.findByIdAndRemove(req.params.id);
      res.status(204).end();
    } else {
      res.status(401).send({ error: 'Cannot delete participation wrong user' });
    }
  } catch (error) {
    return next(error);
  }
});

participationRoutes.put('/:id', async (req, res, next) => {
  const body = req.body;

  try {
    const oldParticipation = await Participation.findById(
      req.params.id
    ).populate('participant');

    if (oldParticipation.participant.id === req.user.id) {
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
    } else {
      res.status(401).send({ error: 'Cannot update participation wrong user' });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = participationRoutes;
