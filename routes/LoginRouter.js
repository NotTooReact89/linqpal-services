const express = require('express');

const loginControl = require('../controllers/LoginController');

const router = express.Router();

router.post('/login', loginControl.verifyLogin);
router.post('/signup', loginControl.createLogin);

module.exports = router;
