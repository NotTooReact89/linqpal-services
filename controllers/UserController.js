const User = require('../models/UserModel');
const apiUtils = require('../common/Utils');

createUser = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide all the info',
    });
  }

  const user = new User({ ...body, ssn: apiUtils.encryptSSN(body.ssn) });

  if (!user) {
    return res.status(400).json({ success: false, error: err });
  }

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: 'User created!',
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'User not created!',
      });
    });
};

updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'User not found!',
      });
    }
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.telephoneNumber = body.telephoneNumber;
    user.fullAddress = body.fullAddress;
    user.ssn = apiUtils.encryptSSN(body.ssn);
    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: 'User updated!',
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'User not updated!',
        });
      });
  });
};

deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      return res.status(200).json({ success: true });
    }

    const modifiedUsers = users.map((user) => {
      user.ssn = apiUtils.decryptSSN(user.ssn);
      return user;
    });

    return res.status(200).json({ success: true, data: modifiedUsers });
  }).catch((err) => console.log(err));
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
};
