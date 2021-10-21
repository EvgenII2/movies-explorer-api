const { UNAUTHORIZED_CODE } = require('../constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = UNAUTHORIZED_CODE;
  }
}

module.exports = UnauthorizedError;
