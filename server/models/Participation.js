const mongoose = require('mongoose');
const { Schema } = mongoose;

const participationSchema = new Schema({
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  type: { type: String, enum: ['yes', 'maybe', 'no'] }
});

participationSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Participation', participationSchema);
