const locationsRoutes = require('express').Router();
const Location = require('../models/Location');

locationsRoutes.get('', async (req, res) => {
  const locations = await Location.find({});
  res.json(locations.map(location => location.toJSON()));
});

locationsRoutes.get('/:id', async (req, res, next) => {
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

locationsRoutes.post('', async (req, res, next) => {
  const body = req.body;

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

locationsRoutes.delete('/:id', async (req, res, next) => {
  try {
    await Location.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    return next(error);
  }
});

locationsRoutes.put('/:id', async (req, res, next) => {
  const body = req.body;

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

module.exports = locationsRoutes;
