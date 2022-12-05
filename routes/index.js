const router = require('express').Router();
const auth = require('../middlewares/auth');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { checkUser, checkLogin } = require('../validation/validation');

router.post('/signin', checkLogin, login);
router.post('/signup', checkUser, createUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;
