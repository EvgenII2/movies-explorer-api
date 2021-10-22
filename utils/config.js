require('dotenv').config();

const { NODE_ENV, JWT_SECRET, BD_NAME_ON_SERVER } = process.env;

module.exports.SALT_ROUNDS = 10;
module.exports.SECRET_STRING = NODE_ENV === 'production' ? JWT_SECRET : 'somethig very difficult';
module.exports.BD_NAME = NODE_ENV === 'production' ? BD_NAME_ON_SERVER : 'mongodb://localhost:27017/moviesdb';
