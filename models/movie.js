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
    validate: [validator.isURL, 'invalid URL'],
  },
  trailer: {
    type: String,
    required: true,
    validate: [validator.isURL, 'invalid URL'],
  },
  thumbnail: {
    type: String,
    required: true,
    validate: [validator.isURL, 'invalid URL'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    // validate: [validator.isInt, 'invalid movieId'],
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },

}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);