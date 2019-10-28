const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: { type: String, required: true, maxlength: 50 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, maxlength: 1000 },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Participation'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

eventSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Event', eventSchema);
