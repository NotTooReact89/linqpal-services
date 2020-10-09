const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = new Schema(
  {
    client_api_key: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('clients', Client);
