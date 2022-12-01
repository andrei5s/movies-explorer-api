const router = require('express').Router();
const { checkProfile, checkUserById } = require('../validation/validation');

const {
  getUser,
  updateProfile,
  getCurrentUser,

} = require('../controllers/users');

router.get('/', getUser);

router.get('/me', checkUserById, getCurrentUser);

router.patch('/me', checkProfile, updateProfile);

module.exports = router;
