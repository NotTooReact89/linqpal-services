const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiUtils = require('./common/Utils');
const errorHandler = require('./common/ErrorHandler');
const userRouter = require('./routes/UserRouter');
const loginRouter = require('./routes/LoginRouter');
const adminRouter = require('./routes/AdminRouter');

const db = require('./db');

const app = express();
const apiPort = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(apiUtils.clientApiKeyValidation);

// use JWT auth to secure the api
app.use(apiUtils.jwt());

app.use('/linqpal', [loginRouter, userRouter, adminRouter]);

// global error handler
app.use(errorHandler);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
