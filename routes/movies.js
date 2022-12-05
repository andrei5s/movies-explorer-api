const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  checkCreateMovie,
  checkDeletedMovie,
} = require('../validation/validation');

router.get('/', getMovies);

router.post('/', checkCreateMovie, createMovie);

router.delete('/:movieId', checkDeletedMovie, deleteMovie);

module.exports = router;
