const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
  name: { type: String, default: '' },
  address: { type: String, required: true },
  areaCode: { type: String, required: true },
  city: { type: String, required: true },
  phoneNum: { type: String, default: '' },
  webUrl: { type: String, default: '' },
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
