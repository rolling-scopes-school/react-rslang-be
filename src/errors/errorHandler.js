const { NotFoundError, BadRequest } = require('./appErrors');

const handle = (err, req, res, next) => {
  console.error(err);
  if (err instanceof NotFoundError || err instanceof BadRequest) {
    res.status(err.status).send(err.message);
  } else if (err) {
    res.sendStatus(500);
  }
  next();
};

module.exports = handle;
