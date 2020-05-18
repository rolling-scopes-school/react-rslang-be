require('express-async-errors');
const express = require('express');
const createError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NOT_FOUND } = require('http-status-codes');

const winston = require('./common/logging');
const wordsRouter = require('./resources/words/word.router');
const statisticsRouter = require('./resources/statistics/statistics.router');
const settingsRouter = require('./resources/settings/settings.router');
const errorHandler = require('./errors/errorHandler');
const checkAuth = require('./common/checkAuth');
const signinRouter = require('./resources/users/signin.router');
const signupRouter = require('./resources/users/signup.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(checkAuth);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(
  morgan(
    ':method :status :url :userId size req :req[content-length] res :res[content-length] - :response-time ms',
    {
      stream: winston.stream
    }
  )
);

app.use('/signin', signinRouter);

app.use('/signup', signupRouter);

app.use('/words', wordsRouter);

app.use('/statistics', statisticsRouter);

app.use('/settings', settingsRouter);

app.use((req, res, next) => next(createError(NOT_FOUND)));

app.use(errorHandler);

module.exports = app;
