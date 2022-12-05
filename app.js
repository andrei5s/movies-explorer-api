require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');

const routes = require('./routes/index');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimit');
const errorHendler = require('./middlewares/errorHendler');
const allowedCors = require('./utils/constants');

const app = express();
app.use(cors({
  origin: allowedCors,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

mongoose.connect('mongodb://localhost:27017/moviesdb');

// для собирания JSON-формата
app.use(bodyParser.json());
// для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(helmet());

app.use(limiter);

const { PORT = 3000 } = process.env;

app.use(routes);

app.use(express.json());

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Указанный путь не существует'));
});

// подключаем логгер ошибок
app.use(errorLogger);

// Обработка ошибок celebrate
app.use(errors());

app.use(errorHendler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
