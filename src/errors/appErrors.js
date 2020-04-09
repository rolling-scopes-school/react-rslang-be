class NotFoundError extends Error {
  constructor(message = '404 Not found') {
    super(message);
    this.status = '404';
  }
}

class BadRequest extends Error {
  constructor(message = '400 Bad request') {
    super(message);
    this.status = '400';
  }
}

module.exports = { NotFoundError, BadRequest };
