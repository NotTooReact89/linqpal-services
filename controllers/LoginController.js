const config = require('../common/Config.json');
const jwt = require('jsonwebtoken');
const Login = require('../models/LoginModel');
const User = require('../models/UserModel');

verifyLogin = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Bad data',
    });
  }

  const login = new Login(body);

  if (!login) {
    return res.status(400).json({ success: false, error: err });
  }

  await Login.findOne({ username: login.username }, (err, loginDetails) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!loginDetails) {
      return res.status(401).json({
        success: false,
        error: `Invalid credentials supplied`,
      });
    }
    const token = jwt.sign({ sub: login.username }, config.secret, {
      expiresIn: '7d',
    });

    return res.status(200).json({
      success: true,
      data: {
        username: loginDetails.username,
        name: loginDetails.name,
        token,
      },
    });
  }).catch((err) => console.log(err));
};

createLogin = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Bad data',
    });
  }

  const login = new Login(body);

  if (!login) {
    return res.status(400).json({ success: false, error: err });
  }

  login
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        data: { ...login, token },
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Admin user was not created!',
      });
    });
};

module.exports = {
  createLogin,
  verifyLogin,
};
