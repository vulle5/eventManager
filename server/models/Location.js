const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
  name: String,
  address: { type: String, required: true },
  phoneNum: String,
  webUrl: String,
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

locationSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Location', locationSchema);
