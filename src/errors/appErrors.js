const {
  NOT_FOUND,
  EXPECTATION_FAILED,
  UNAUTHORIZED,
  FORBIDDEN,
  BAD_REQUEST,
  getStatusText
} = require('http-status-codes');

class AppError extends Error {
  constructor(message) {
    super(message);
  }
}

class NotFoundError extends AppError {
  constructor(entity, params, message) {
    super(
      message || `Couldn't find a(an) ${entity} with: ${JSON.stringify(params)}`
    );
    this.status = NOT_FOUND;
  }
}

class BadRequestError extends AppError {
  constructor(message) {
    super(message);
    this.status = BAD_REQUEST;
  }
}

class EntityExistsError extends AppError {
  constructor(message) {
    super(message);
    this.status = EXPECTATION_FAILED;
  }
}

class AuthorizationError extends AppError {
  constructor(message) {
    super(message || getStatusText(UNAUTHORIZED));
    this.status = UNAUTHORIZED;
  }
}

class AuthenticationError extends AppError {
  constructor(message) {
    super(message || getStatusText(FORBIDDEN));
    this.status = FORBIDDEN;
  }
}

module.exports = {
  NOT_FOUND_ERROR: NotFoundError,
  BAD_REQUEST_ERROR: BadRequestError,
  AUTHORIZATION_ERROR: AuthorizationError,
  AUTHENTICATION_ERROR: AuthenticationError,
  ENTITY_EXISTS: EntityExistsError
};
