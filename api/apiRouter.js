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

        users.insert({ username: req.body.username, password: hash })
            .then(userAdded => {
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
                    res.status(200).json({ message: `Welcome ${user.username}!` });
                } else {
                    res.status(401).json({ message: 'Invalid Credentials' });
                }
            }).catch(err => {
                res.status(500).json({ message: 'Unable to find user information.' });
            });
    }
});

module.exports = router;