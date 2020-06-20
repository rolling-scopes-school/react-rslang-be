const { OK } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });

const { wordId } = require('../../utils/validation/schemas');
const { validator } = require('../../utils/validation/validator');
const aggregatedWordsService = require('./aggregatedWord.service');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');
const extractQueryParam = require('../../utils/getQueryNumberParameter');

function extractFilter(filter) {
  if (!filter) {
    return [];
  }

  return Object.entries(JSON.parse(filter)).reduce((arr, [k, v]) => {
    const obj = {};
    obj[k] = v;
    arr.push(obj);
  }, []);
}

router.get('/', async (req, res) => {
  const page = extractQueryParam(req.query.page, 0);
  const perPage = extractQueryParam(req.query.wordsPerPage, 10);

  if (isNaN(page) || isNaN(perPage)) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters: page and words-per-page numbers should be valid integers'
    );
  }

  const filter = extractFilter(req.query.filter);
  console.log(JSON.stringify(filter, null, 1));
  const words = await aggregatedWordsService.getAll(
    req.userId,
    page,
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
