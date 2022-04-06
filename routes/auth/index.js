const router = require('express').Router();
const { login, logout } = require('./controllers');

router.get('/login', login);
router.get('/logout', logout);

exports.router = router;
