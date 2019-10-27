const jwt = require('jsonwebtoken');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const authentication = (req, res, next) => {
  const getTokenFrom = req => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7);
    }
    return null;
  };

  const token = getTokenFrom(req);
  if (token) {
    try {
      req.user = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      return res.status(400).send({ error: 'Failed to authenticate token' });
    }
  } else {
    return res.status(400).send({ error: 'No token' });
  }
  next();
  return;
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'id is malformed' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  authentication
};
