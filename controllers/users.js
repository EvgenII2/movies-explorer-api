const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');
const NotFoundError = require('../utils/errors/NotFoundError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { SALT_ROUNDS, SECRET_STRING } = require('../utils/constants');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((currentUser) => {
      if (!currentUser) {
        next(new NotFoundError('Данные не найдены'));
      } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.send(currentUser);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неккоректные данные'));
      }
      next(err);
    });
};

module.exports.editUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Данные не найдены'));
      }
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError'
        || err.name === 'ValidationError') {
        next(new BadRequestError('Неккоректные данные'));
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  User.findOne({ email })
    .then((findUser) => {
      if (findUser) {
        next(new ConflictError('ConflictError'));
      } else {
        bcrypt.hash(password, SALT_ROUNDS)
          .then((hash) => {
            User.create({
              name,
              email,
              password: hash,
            })
              .then((user) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                res.send({
                  name: user.name,
                  email: user.email,
                });
              })
              .catch((err) => {
                if (err.name === 'ValidationError') {
                  next(new BadRequestError('Неккоректные данные'));
                }
                next(err);
              });
          });
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_STRING, { expiresIn: '7d' });
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
      res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizedError(`Что-то с авторизацией. ${err}`));
    });
};
