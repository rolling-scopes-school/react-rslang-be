const { OK } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });

const { wordId } = require('../../utils/validation/schemas');
const { validator } = require('../../utils/validation/validator');
const aggregatedWordsService = require('./aggregatedWord.service');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');
const extractQueryParam = require('../../utils/getQueryNumberParameter');

router.get('/', async (req, res) => {
  const perPage = extractQueryParam(req.query.wordsPerPage, 10);
  const group = extractQueryParam(req.query.group, 0);

  if (isNaN(group) || isNaN(perPage)) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters: the group and words-per-page number should be valid integers'
    );
  }

  const filter = req.query.filter ? JSON.parse(req.query.filter) : null;

  const words = await aggregatedWordsService.getAll(
    req.userId,
    group,
    perPage,
    filter
  );
  res.status(OK).send(words);
});

router.get('/:wordId', validator(wordId, 'params'), async (req, res) => {
  const word = await aggregatedWordsService.get(req.params.wordId, req.userId);
  res.status(OK).send(word);
});

module.exports = router;
