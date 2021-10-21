const { FORBIDDEN_CODE } = require('../constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = FORBIDDEN_CODE;
  }
}

module.exports = ForbiddenError;
