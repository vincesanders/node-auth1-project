const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const apiRouter = require('./api/apiRouter');
const session = require('express-session');
const knexStore = require('connect-session-knex')(session);
const knex = require('./data/dbConfig');

const server = express();

server.use(express.json(), helmet(), cors(), session({
    name: 'users-session',
    secret: 'my secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, //1 hour
        secure: false,
        httpOnly: true
    },
    store: new knexStore({
        knex: knex,
        tablename: 'sessions',
        createtable: true,
        sidfieldname: 'session_id',
        clearInterval: 1000 * 60 * 15
    })
}));

server.use('/api', apiRouter);

module.exports = server;