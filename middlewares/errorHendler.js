const { ERROR_SERVER } = require('../utils/constants');

const errorHendler = ((err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;
  const errorMessage = (statusCode === ERROR_SERVER) ? 'Ошибка на сервере' : message;
  res.status(statusCode).send({ message: errorMessage });
  next();
});

module.exports = errorHendler;
