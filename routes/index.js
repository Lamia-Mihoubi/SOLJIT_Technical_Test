const router = require('express').Router();
const auth = require('./auth/index');

router.use('/auth', auth.router);

exports.router = router;
