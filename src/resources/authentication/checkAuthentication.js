const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { AUTHORIZATION_ERROR } = require('../../errors/appErrors');

const ALLOWED_PATHS = ['/signin', '/signup'];
const DOC_PATH_REGEX = /^\/doc\/?$/;
const DOC_PATH_RESOURCES_REGEX = /^\/doc\/.+$/;
const WORDS_PATH_REGEX = /^\/words$/;
const WORDS_COUNT_PATH_REGEX = /^\/words\/count$/;
const USERS_PATH = '/users';

function isOpenPath(path) {
  return (
    ALLOWED_PATHS.includes(path) ||
    DOC_PATH_REGEX.test(path) ||
    DOC_PATH_RESOURCES_REGEX.test(path) ||
    WORDS_PATH_REGEX.test(path) ||
    WORDS_COUNT_PATH_REGEX.test(path)
  );
}

const checkAuthentication = (req, res, next) => {
  if (isOpenPath(req.path)) {
    return next();
  }

  if (req.path === USERS_PATH && req.method === 'POST') {
    return next();
  }

  const rawToken = req.headers.authorization;
  if (!rawToken) {
    throw new AUTHORIZATION_ERROR();
  }

  try {
    const token = rawToken.slice(7, rawToken.length);
    req.userId = jwt.verify(token, JWT_SECRET_KEY).id;
  } catch (error) {
    throw new AUTHORIZATION_ERROR();
  }

  next();
};

module.exports = checkAuthentication;
