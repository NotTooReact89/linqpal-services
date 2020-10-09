const Client = require('../models/ClientModel');

getClientDetails = (clientApiKey) => {
  return new Promise((resolve, reject) => {
    Client.findOne({ client_api_key: clientApiKey }, (err, client) => {
      if (client) {
        resolve(client);
      } else {
        reject(false);
      }
    });
  });
};

module.exports = {
  getClientDetails,
};
