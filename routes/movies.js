const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexHTTP } = require('../utils/constants');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.delete('/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }), deleteMovie);
router.post('/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(new RegExp(regexHTTP)),
      trailer: Joi.string().required().pattern(new RegExp(regexHTTP)),
      thumbnail: Joi.string().required().pattern(new RegExp(regexHTTP)),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }), createMovie);

module.exports = router;
