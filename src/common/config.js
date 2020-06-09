const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  MAX_SYMBOLS_PER_OBJECT: 5000,
  MAX_OPTIONAL_PROPERTIES: 100,
  LOGS_DIR: path.join(__dirname, '../../logs'),
  JWT_EXPIRE_TIME: '4h'
};
