class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.status = '404';
  }
}

class BadRequest extends Error {
  constructor(message = 'Bad request') {
    super(message);
    this.status = '400';
  }
}

module.exports = { NotFoundError, BadRequest };
