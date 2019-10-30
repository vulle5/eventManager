const commentRoutes = require('express').Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const Event = require('../models/Event');

commentRoutes.get('/:id', async (req, res, next) => {
  try {
    const { comments } = await Event.findById(req.params.id).populate({
      path: 'comments',
      populate: { path: 'user', select: 'name username' }
    });

    if (comments) {
      res.json(comments);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    return next(error);
  }
});

commentRoutes.post('', async (req, res, next) => {
  const body = req.body;

  try {
    const user = await User.findById(req.user.id);
    const event = await Event.findById(body.eventId);

    const comment = new Comment({
      comment: body.comment,
      event: event._id,
      user: user._id
    });
    const savedComment = await comment.save();

    event.comments = event.comments.concat(savedComment._id);
    await event.save();
    res.status(201).json(savedComment.toJSON());
  } catch (error) {
    return next(error);
  }
});

commentRoutes.delete('/:id', async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('user');

    if (comment.user.id === req.user.id) {
      await Comment.findByIdAndRemove(req.params.id);
      res.status(204).end();
    } else {
      res.status(401).send({
        error: 'Cannot delete comment wrong user'
      });
    }
  } catch (error) {
    return next(error);
  }
});

commentRoutes.put('/:id', async (req, res, next) => {
  const body = req.body;

  try {
    const oldComment = await Comment.findById(req.params.id).populate('user');

    if (oldComment.user.id === req.user.id) {
      const newComment = {
        comment: body.comment || oldComment.comment,
        likes: oldComment.likes
      };

      const comment = await Comment.findByIdAndUpdate(
        req.params.id,
        newComment,
        {
          new: true
        }
      );
      res.json(comment.toJSON());
    } else {
      res.status(401).send({
        error: 'Cannot update comment wrong user'
      });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = commentRoutes;
