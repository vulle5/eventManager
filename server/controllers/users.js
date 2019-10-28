const bcrypt = require('bcrypt');
const userRoutes = require('express').Router();
const User = require('../models/User');

userRoutes.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('events', {
      name: 1,
      startDate: 1,
      endDate: 1
    })
    .populate('locations', {
      name: 1,
      address: 1,
      areaCode: 1,
      city: 1,
      phoneNum: 1,
      webUrl: 1
    })
    .populate('participations', { event: 1, type: 1 })
    .populate({
      path: 'participations',
      select: 'event type',
      populate: { path: 'event', select: 'name startDate endDate' }
    });
  res.json(users.map(u => u.toJSON()));
});

userRoutes.post('/', async (req, res, next) => {
  try {
    const body = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();

    res.json(savedUser);
  } catch (exception) {
    return next(exception);
  }
});

module.exports = userRoutes;
