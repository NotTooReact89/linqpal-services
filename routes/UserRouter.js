const express = require('express');

const userControl = require('../controllers/UserController');
const loginControl = require('../controllers/LoginController');

const router = express.Router();

router.post('/user', userControl.createUser);
router.put('/user/:id', userControl.updateUser);
router.delete('/user/:id', userControl.deleteUser);
router.get('/user/:id', userControl.getUserById);

module.exports = router;
