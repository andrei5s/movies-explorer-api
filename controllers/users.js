const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/user');
const ExistError = require('../errors/existerr');
const BadRequestError = require('../errors/bedrequserror');
const NotFoundError = require('../errors/not-found-err');
const { STATUS_OK, STATUS_CREATED } = require('../utils/constants');

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res
      .status(STATUS_CREATED)
      .send({
        email: user.email,
        name: user.name,
      }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Ошибка валидации данных'));
        return;
      }
      if (err.code === 11000) {
        next(new ExistError('Такой пользователь уже существует!'));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }),
      });
    })
    .catch(next);
};

// eslint-disable-next-line consistent-return
const getUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(STATUS_OK).send(user);
    })
  // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Не корректный _id'));
      }
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user, { name, email }, { new: true, runValidators: true })
  // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(STATUS_OK).send(user);
    })
  // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Не корректный _id'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Ошибка валидации данных'));
      }
      next(err);
    });
};

module.exports = {
  createUser,
  getUser,
  updateProfile,
  login,
  getCurrentUser,
};
