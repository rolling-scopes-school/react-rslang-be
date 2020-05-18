const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { AUTHORIZATION_ERROR } = require('../errors/appErrors');

const ALLOWED_PATHS = ['/signin', '/signup', '/doc', '/words'];

const checkAuth = (req, res, next) => {
  if (ALLOWED_PATHS.includes(req.path)) {
    return next();
  }

  const rawToken = req.headers.authorization;
  if (!rawToken) {
    throw new AUTHORIZATION_ERROR();
  }

  try {
    const token = rawToken.slice(7, rawToken.length);
    req.authUserId = jwt.verify(token, JWT_SECRET_KEY).id;
  } catch (error) {
    throw new AUTHORIZATION_ERROR();
  }

  next();
};

module.exports = checkAuth;
