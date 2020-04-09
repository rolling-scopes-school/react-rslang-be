const notFoundError = require('./appErrors');

const handle = (err, req, res, next) => {
  console.error(err);
  if (err instanceof notFoundError) {
    res.status(err.status).send(err.message);
  } else if (err) {
    res.sendStatus(500);
  }
  next();
};

module.exports = handle;
