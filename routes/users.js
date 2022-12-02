const router = require('express').Router();
const { checkProfile } = require('../validation/validation');

const {
  updateProfile,
  getCurrentUser,

} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', checkProfile, updateProfile);

module.exports = router;
