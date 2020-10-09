const CryptoJS = require('crypto-js');
const expressJwt = require('express-jwt');
const config = require('./Config.json');
const User = require('../models/UserModel');
const getClientDetails = require('../controllers/ClientController');

function encryptSSN(ssn) {
  try {
    return CryptoJS.AES.encrypt(ssn, config.secret).toString();
  } catch (e) {
    return 'There was a problem with encryption';
  }
}

function decryptSSN(ssn) {
  try {
    const bytes = CryptoJS.AES.decrypt(ssn, config.secret);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    return 'There was a problem with decryption';
  }
}

function jwt() {
  const { secret } = config;
  return expressJwt({ secret, algorithms: ['HS256'] }).unless({
    path: [
      // public routes that don't require authentication
      '/linqpal/user',
      '/linqpal/signup',
      '/linqpal/login',
    ],
  });
}

async function clientApiKeyValidation(req, res, next) {
  let clientApiKey = req.get('x-api-key');
  if (!clientApiKey) {
    return res.status(400).send({
      status: false,
      response: 'Missing Api Key',
    });
  }
  try {
    let clientDetails = await getClientDetails.getClientDetails(clientApiKey);
    if (clientDetails) {
      next();
    }
  } catch (e) {
    return res.status(400).send({
      status: false,
      response: 'Invalid Api Key',
    });
  }
}

module.exports = { encryptSSN, decryptSSN, jwt, clientApiKeyValidation };
