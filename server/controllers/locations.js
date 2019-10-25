const locationRoutes = require('express').Router();
const Location = require('../models/Location');

locationRoutes.get('', (req, res) => {
  Location.find({}).then(locations => {
    res.json(locations.map(location => location.toJSON()));
  });
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

locationRoutes.delete('/:id', (req, res, next) => {
  Location.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = locationRoutes;
