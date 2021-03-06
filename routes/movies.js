const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const { regexHTTP } = require('../utils/constants');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies/', getMovies);
router.delete('/movies/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }), deleteMovie);
router.post('/movies/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required(),
      trailer: Joi.string().required(),
      thumbnail: Joi.string().required(),
      id: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string(),
    }),
  }), createMovie);

module.exports = router;
