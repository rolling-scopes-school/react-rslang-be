const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const wordsRouter = require('./resources/words/word.router');
const statisticsRouter = require('./resources/statistics/statistics.router');
const settingsRouter = require('./resources/settings/settings.router');
const errorHandler = require('./errors/errorHandler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  console.log(`\n###### STARTED REQUEST ${req.method} ${req.originalUrl}\n`);
  res.on('finish', () => {
    console.log(
      `\n========= FINISHED REQUEST ${req.method} ${req.originalUrl} ${res.statusCode}\n`
    );
  });
  next();
});

app.use('/words', wordsRouter);

app.use('/statistics', statisticsRouter);

app.use('/statistics', settingsRouter);

app.use(errorHandler);

module.exports = app;
