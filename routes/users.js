const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  editUser,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), editUser);

module.exports = router;
