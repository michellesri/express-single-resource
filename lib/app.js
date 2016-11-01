const express = require('express');
const app = express();
const errorHandler = require('./errorHandler');

app.use(errorHandler);

module.exports = app;
