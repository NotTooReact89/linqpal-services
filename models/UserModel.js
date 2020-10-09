const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    telephoneNumber: { type: String, required: true },
    fullAddress: { type: String, required: true },
    ssn: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('users', User);
