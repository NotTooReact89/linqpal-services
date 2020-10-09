const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.get('/users', userController.getUsers);

module.exports = router;
