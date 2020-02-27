const router = require('express').Router();
const bcrypt = require('bcrypt');
const userRouter = require('../users/userRouter');
const users = require('../users/userModel');

router.use('/users', userRouter);

router.post('/register', (req, res) => {
    
    if (!req.body || !req.body.username || !req.body.password) {
        res.status(400).json({ message: 'Please include a username and password.' })
    } else {
        console.log(process.env.BCRYPT_ROUNDS)
        const hash = bcrypt.hashSync(req.body.password, Number(process.env.BCRYPT_ROUNDS));
        let user = { username: req.body.username, password: hash };

        users.insert(user)
            .then(userAdded => {
                req.session.user = user;
                res.status(201).json(userAdded);
            }).catch(err => {
                res.status(500).json(err);
            });
    }
});

router.post('/login', (req, res) => {
    if (!req.body || !req.body.username || !req.body.password) {
        res.status(400).json({ message: 'Please include a username and password.' })
    } else {
        users.getBy({ username: req.body.username })
            .then(user => {
                if (user && bcrypt.compareSync(req.body.password, user.password)) {
                    req.session.user = user;
                    res.status(200).json({ message: `Welcome ${user.username}!` });
                } else {
                    res.status(401).json({ message: 'Invalid Credentials' });
                }
            }).catch(err => {
                res.status(500).json({ message: 'Unable to find user information.' });
            });
    }
});

router.delete('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ message: "Unable to logout." });
            } else {
                res.status(200).json({ message: 'Logout successful.' });
            }
        });
    } else {
        res.status(500).json({ message: 'You are already logged out.' });
    }
});

module.exports = router;