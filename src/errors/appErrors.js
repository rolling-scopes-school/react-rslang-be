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
    super(JSON.stringify(message) || JSON.stringify('Пользователь не найден'));
    this.status = NOT_FOUND;
  }
}

class BadRequestError extends AppError {
  constructor(message) {
    super(JSON.stringify(message));
    this.status = BAD_REQUEST;
  }
}

class EntityExistsError extends AppError {
  constructor(message) {
    super(JSON.stringify(message));

    this.status = EXPECTATION_FAILED;
  }
}

class AuthorizationError extends AppError {
  constructor(message) {
    super(JSON.stringify(message) || getStatusText(UNAUTHORIZED));
    this.status = UNAUTHORIZED;
  }
}

class AuthenticationError extends AppError {
  constructor(message) {
    super(JSON.stringify(message) || getStatusText(FORBIDDEN));
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
