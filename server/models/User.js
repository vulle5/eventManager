const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3
  },
  name: { type: String, default: '' },
  passwordHash: { type: String, minlength: 6 },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  ],
  locations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location'
    }
  ],
  participations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Participation'
    }
  ]
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // never reveal passwordHash to public
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
