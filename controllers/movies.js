const Movie = require('../models/movie');
const BadRequestError = require('../errors/bedrequserror');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const { STATUS_OK, STATUS_CREATED } = require('../utils/constants');

module.exports.createMovie = (req, res, next) => {
  const owner = req.params._id;
  Movie.create({ ...req.body, owner })
    .then((user) => res.status(STATUS_CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name.includes('ValidationError')) {
        next(new BadRequestError('Ошибка валидации данных'));
        return;
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((data) => res.status(STATUS_OK).send(data))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Такого фильма нет!');
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError('Невозможно удалить данный фильм');
      }
      return movie.remove()
        .then(() => res.status(STATUS_OK).send({ data: movie }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Ошибка валидации данных'));
        return;
      }
      next(err);
    });
};
