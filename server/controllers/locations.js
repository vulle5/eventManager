const locationRoutes = require('express').Router();
const Location = require('../models/Location');

locationRoutes.get('', async (req, res) => {
  const locations = await Location.find({}).populate('events', {
    name: 1,
    startDate: 1,
    endDate: 1
  });
  res.json(locations.map(location => location.toJSON()));
});

locationRoutes.get('/:id', async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);

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

  // TODO: Make sure that only the user can creat an location
  try {
    const location = new Location({
      name: body.name,
      address: body.address,
      phoneNum: body.phoneNum,
      webUrl: body.webUrl
    });
    const savedLocation = await location.save();
    res.status(201).json(savedLocation.toJSON());
  } catch (error) {
    return next(error);
  }
});

locationRoutes.delete('/:id', async (req, res, next) => {
  try {
    await Location.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    return next(error);
  }
});

locationRoutes.put('/:id', async (req, res, next) => {
  const body = req.body;

  // TODO: Make sure that only organizer can update the location
  try {
    const oldLocation = await Location.findById(req.params.id);

    const newLocation = {
      name: body.name || oldLocation.name,
      address: body.address || oldLocation.address,
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
  } catch (error) {
    return next(error);
  }
});

module.exports = locationRoutes;
