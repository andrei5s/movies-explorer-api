const STATUS_OK = 200;
const STATUS_CREATED = 201;
const ERROR_SERVER = 500;

const allowedCors = [
  'https://movie.andrei5s.nomoredomains.club',
  'http://movie.andrei5s.nomoredomains.club',
  'https://api.movie.andrei5s.nomoredomains.club',
  'http://api.movie.andrei5s.nomoredomains.club',
  'http://localhost:3000',
  'http://localhost:3001',
];

module.exports = {
  STATUS_OK,
  STATUS_CREATED,
  ERROR_SERVER,
  allowedCors,
};
