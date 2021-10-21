require('dotenv').config();

const { NODE_ENV, JWT_SECRET, BD_NAME_ON_SERVER } = process.env;

module.exports.BAD_REQUEST_CODE = '400';
module.exports.UNAUTHORIZED_CODE = '401';
module.exports.FORBIDDEN_CODE = '403';
module.exports.NOT_FOUND_CODE = '404';
module.exports.CONFLICT_CODE = '409';
module.exports.INTERNAL_SERVER_ERROR_CODE = '500';

module.exports.regexHTTP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports.SALT_ROUNDS = 10;
module.exports.SECRET_STRING = NODE_ENV === 'production' ? JWT_SECRET : 'somethig very difficult';
module.exports.BD_NAME = NODE_ENV === 'production' ? BD_NAME_ON_SERVER : 'bitfilmsdb';
