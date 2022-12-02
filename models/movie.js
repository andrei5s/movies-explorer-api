const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [validator.isURL, 'Неверная ссылка на картинку'],
  },
  trailerLink: {
    type: String,
    required: true,
    validate: [validator.isURL, 'Неверный адрес ссылки'],
  },
  thumbnail: {
    type: String,
    required: true,
    validate: [validator.isURL, 'Неверная ссылка на картинку'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    default: '',
  },
  nameEN: {
    type: String,
    required: true,
    default: '',
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
