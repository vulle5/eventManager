const locationRoutes = require('express').Router();
const Location = require('../models/Location');
const User = require('../models/User');

locationRoutes.get('', async (req, res) => {
  const locations = await Location.where({ user: req.user.id })
    .populate('events', {
      name: 1,
      startDate: 1,
      endDate: 1
    })
    .populate('user', { username: 1, name: 1 });
  res.json(locations.map(location => location.toJSON()));
});

locationRoutes.get('/:id', async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id).populate('events', {
      name: 1,
      startDate: 1,
      endDate: 1
    });

    if (location) {
      res.json(location.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (error) {
    return next(error);
  }
});

locationRoutes.post('', async (req, res, next) => {
  const body = req.body;

  try {
    const user = await User.findById(req.user.id);

    const location = new Location({
      name: body.name,
      address: body.address,
      areaCode: body.areaCode,
      city: body.city,
      phoneNum: body.phoneNum,
      webUrl: body.webUrl,
      user: user._id
    });
    const savedLocation = await location.save();

    user.locations = user.locations.concat(savedLocation._id);
    await user.save();
    res.status(201).json(savedLocation.toJSON());
  } catch (error) {
    return next(error);
  }
});

locationRoutes.delete('/:id', async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id)
      .populate('events')
      .populate('user');

    if (!location.events.length && location.user.id === req.user.id) {
      await Location.findByIdAndRemove(req.params.id);
      res.status(204).end();
    } else {
      res.status(401).send({
        error: 'Cannot delete event wrong user or location has events'
      });
    }
  } catch (error) {
    return next(error);
  }
});

locationRoutes.put('/:id', async (req, res, next) => {
  const body = req.body;

  try {
    const oldLocation = await Location.findById(req.params.id).populate('user');

    if (oldLocation.user.id === req.user.id) {
      const newLocation = {
        name: body.name || oldLocation.name,
        address: body.address || oldLocation.address,
        areaCode: body.areaCode || oldLocation.areaCode,
        city: body.city || oldLocation.city,
        phoneNum: body.phoneNum || oldLocation.phoneNum,
        webUrl: body.webUrl || oldLocation.webUrl
      };

      const location = await Location.findByIdAndUpdate(
        req.params.id,
        newLocation,
        {
          new: true
        }
      );
      res.json(location.toJSON());
    } else {
      res.status(401).send({
        error: 'Cannot update event wrong user'
      });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = locationRoutes;
