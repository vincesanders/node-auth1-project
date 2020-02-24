const bcrypt = require('bcrypt');

const users = require('../users/userModel');

module.exports = (req, res, next) => {
    if (req.headers.username && req.headers.password) {
        users.getBy({ username: req.headers.username }).first()
            .then(user => {
                if (user && bcrypt.compareSync(req.headers.password, user.password)) {
                    next();
                } else {
                    res.status(401).json({ message: 'Invalid Credentials.' })
                }
            }).catch(error => {
                res.status(500).json({ name, message, stack });
            });
    } else {
        res.status(400).json({ message: 'Please include full credentials.' });
    }
};