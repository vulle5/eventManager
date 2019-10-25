const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
  name: String,
  address: { type: String, required: true },
  phoneNum: String,
  webUrl: String
});

locationSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Location', locationSchema);
