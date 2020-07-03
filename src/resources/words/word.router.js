const { OK } = require('http-status-codes');
const router = require('express').Router();

const wordService = require('./word.service');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');
const extractQueryParam = require('../../utils/getQueryNumberParameter');

router.route('/').get(async (req, res) => {
  const page = extractQueryParam(req.query.page, 0);
  const group = extractQueryParam(req.query.group, 0);
  const wordsPerPage = extractQueryParam(req.query.wordsPerPage, 10);
  const wordsPerExampleSentenceLTE = extractQueryParam(
    req.query.wordsPerExampleSentenceLTE,
    0
  );

  if (
    isNaN(page) ||
    isNaN(group) ||
    isNaN(wordsPerPage) ||
    isNaN(wordsPerExampleSentenceLTE)
  ) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters: the group, page, words-per-page and words-per-example-sentence numbers should be valid integers'
    );
  }

  const words = await wordService.getAll({
    page,
    group,
    wordsPerExampleSentenceLTE,
    wordsPerPage
  });
  res.status(OK).send(words.map(word => word.toResponse()));
});

router.route('/count').get(async (req, res) => {
  const group = extractQueryParam(req.query.group, 0);
  const wordsPerPage = extractQueryParam(req.query.wordsPerPage, 10);
  const wordsPerExampleSentenceLTE = extractQueryParam(
    req.query.wordsPerExampleSentenceLTE,
    0
  );

  if (
    isNaN(wordsPerExampleSentenceLTE) ||
    isNaN(group) ||
    isNaN(wordsPerPage)
  ) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters, the group, words-per-page and words-per-example-sentence numbers should be valid integers'
    );
  }

  let quantity = await wordService.getQuantity(
    group,
    wordsPerExampleSentenceLTE
  );
  if (wordsPerExampleSentenceLTE > 0) {
    quantity = Math.floor(quantity / wordsPerPage);
  }

  res.status(OK).send({ count: quantity });
});

router.route('/:id').get(async (req, res) => {
  const word = await wordService.get(req.params.id, req.query.noAssets);
  res.status(OK).send(word.toResponse());
});

module.exports = router;
