const router = require('express').Router();
const usersDb = require('./userModel');

router.get('/', (req, res) => {
    usersDb.get().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

module.exports = router;