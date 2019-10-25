const mongoose = require('mongoose');
const { Schema } = mongoose;

// Location is going to be connected to Event
// Participants are also going to be connected

const eventSchema = new Schema({
  name: { type: String, required: true, maxlength: 50 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, maxlength: 1000 }
});

eventSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Event', eventSchema);
