const {
  MAX_OPTIONAL_PROPERTIES,
  MAX_SYMBOLS_PER_OBJECT
} = require('../common/config');

const checkLimit = obj =>
  obj.length <= MAX_OPTIONAL_PROPERTIES &&
  JSON.stringify(obj).length <= MAX_SYMBOLS_PER_OBJECT;

module.exports = checkLimit;
