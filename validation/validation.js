const { celebrate, Joi } = require('celebrate');
const url = require('./url-validator');

const checkUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const checkLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const checkProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const checkUserById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().alphanum()
      .length(24),
  }),
});

const checkCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(url, 'url validation'),
    trailerLink: Joi.string().required().custom(url, 'url validation'),
    thumbnail: Joi.string().required().custom(url, 'url validation'),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const checkMovieId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().alphanum()
      .length(24),
  }),
});

const checkDeletedMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().alphanum()
      .length(24),
  }),
});

module.exports = {
  checkUser,
  checkLogin,
  checkProfile,
  checkUserById,
  checkCreateMovie,
  checkMovieId,
  checkDeletedMovie,
};
