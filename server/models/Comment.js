const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  comment: { type: String, maxlength: 200 },
  likes: { type: Number, default: 0 },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

commentSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Comment', commentSchema);
