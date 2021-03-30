const { OK } = require('http-status-codes');
const router = require('express').Router();

const wordService = require('./word.service');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');
const extractQueryParam = require('../../utils/getQueryNumberParameter');

router.route('/').get(async (req, res) => {
  const page = extractQueryParam(req.query.page, 0);
  const group = extractQueryParam(req.query.group, 0);

  if (isNaN(page) || isNaN(group)) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters: the group, page numbers should be valid integers'
    );
  }

  const words = await wordService.getAll({
    page,
    group
  });
  res.status(OK).send(words.map(word => word.toResponse()));
});

router.route('/all').get(async (req, res) => {
  const group = extractQueryParam(req.query.group, 0);
  const amount = extractQueryParam(req.query.amount, 10);

  if (isNaN(group)) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameter: the group should be valid integer'
    );
  }
  console.log(group);
  const words = await wordService.getAllPages({
    group
  });

  const shuffledSplicedWords = words
    .sort(() => Math.random() - 0.5)
    .splice(amount);

  res.status(OK).send(shuffledSplicedWords.map(word => word.toResponse()));
});

router.route('/:id').get(async (req, res) => {
  const word = await wordService.get(req.params.id);
  res.status(OK).send(word.toResponse());
});

module.exports = router;
