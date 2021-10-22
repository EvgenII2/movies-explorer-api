const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');

const { errors } = require('celebrate');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const signRoutes = require('./routes/signs');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { limiter } = require('./middlewares/rateLimiter');
const NotFoundError = require('./utils/errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { BD_NAME } = require('./utils/config');

const app = express();

const { PORT = 3001 } = process.env;

app.use(express.json());

app.use(limiter);

app.use(cors());
app.options('*', cors());
app.use(requestLogger);

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use(signRoutes);

app.use(auth);

app.use(userRoutes);
app.use(movieRoutes);

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose.connect(`${BD_NAME}`, {
  useNewUrlParser: true,
})
  .then(() => {
    app.listen(PORT, () => {
      console.log('LISTENING PORT', PORT);
    });
  })
  .catch((err) => console.log(err.message));
