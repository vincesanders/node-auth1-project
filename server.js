const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const apiRouter = require('./api/apiRouter');

const server = express();

server.use(express.json(), helmet(), cors());

server.use('/api', apiRouter);

module.exports = server;