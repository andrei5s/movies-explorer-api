const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const BadDataError = require('../errors/beddataerr');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, 'Неправильный email'],
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function fn(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new BadDataError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new BadDataError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
