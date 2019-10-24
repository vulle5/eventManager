const eventRoutes = require('express').Router();

eventRoutes.get('', (req, res) => {
  res.json({ time: new Date() });
});

module.exports = eventRoutes;
