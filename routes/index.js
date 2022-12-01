const router = require('express').Router();
const auth = require('../middlewares/auth');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;
