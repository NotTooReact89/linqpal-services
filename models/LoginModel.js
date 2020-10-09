const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Login = new Schema(
  {
    name: { type: String, required: false },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('logins', Login);
