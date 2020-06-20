const { OK } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });

const { wordId } = require('../../utils/validation/schemas');
const { validator } = require('../../utils/validation/validator');
const aggregatedWordsService = require('./aggregatedWord.service');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');
const extractQueryParam = require('../../utils/getQueryNumberParameter');

router.get('/', async (req, res) => {
  const perPage = extractQueryParam(req.query.wordsPerPage, 10);

  if (isNaN(perPage)) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters: the words-per-page number should be a valid integer'
    );
  }

  const words = await aggregatedWordsService.getAll(
    req.userId,
    perPage,
    JSON.parse(req.query.filter)
  );
  res.status(OK).send(words);
});

router.get('/:wordId', validator(wordId, 'params'), async (req, res) => {
  const word = await aggregatedWordsService.get(req.params.wordId, req.userId);
  res.status(OK).send(word);
});

module.exports = router;
