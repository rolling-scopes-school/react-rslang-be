const { OK } = require('http-status-codes');
const router = require('express').Router();

const wordService = require('./word.service');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');

router.route('/').get(async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 0;
  const group = req.query.group ? parseInt(req.query.group, 10) : 0;

  if (isNaN(page) || isNaN(group)) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters, the page and per page numbers should be valid integers'
    );
  }

  const words = await wordService.getAll(page, group);
  res.status(OK).send(words.map(word => word.toResponse()));
});

router.route('/count').get(async (req, res) => {
  const count = await wordService.getCount();
  res.status(OK).send({ count });
});

router.route('/:id').get(async (req, res) => {
  const word = await wordService.get(req.params.id);
  res.status(OK).send(word.toResponse());
});

module.exports = router;
