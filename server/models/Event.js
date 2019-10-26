const mongoose = require('mongoose');
const { Schema } = mongoose;
const Location = require('./Location');

// TODO: Participants are also going to be connected

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
  }
  // participants: {
  //   type: Map,
  //   of: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'User'
  //     }
  //   ]
  // }
});

function removeLinkedDocuments(doc) {
  // doc will be the removed Person document
  //
  // Location.updateOne()
}

eventSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

eventSchema.post('remove', (doc, next) => {
  console.log(doc);
});

module.exports = mongoose.model('Event', eventSchema);
