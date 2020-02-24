const router = require('express').Router();
const usersDb = require('./userModel');
const restricted = require('../utils/restricted');

router.get('/', restricted, (req, res) => {
    usersDb.get().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

module.exports = router;