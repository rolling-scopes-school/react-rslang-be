const { OK } = require('http-status-codes');
const router = require('express').Router();

const wordService = require('./word.service');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');
const extractQueryParam = require('../../utils/getQueryNumberParameter');

router.route('/').get(async (req, res) => {
  const page = extractQueryParam(req.query.page, 0);
  const group = extractQueryParam(req.query.group, 0);
  const sort = extractQueryParam(req.query.sort, 0);

  if (isNaN(page) || isNaN(group)) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters: the group, page numbers should be valid integers'
    );
  }

  const words = await wordService.getAll({
    page,
    group,
    sort
  });
  res.status(OK).send(words.map(word => word.toResponse()));
});

router.route('/all').get(async (req, res) => {
  const maxPagesInGroup = 30;
  const group = extractQueryParam(req.query.group, 0);
  const amount = extractQueryParam(req.query.amount, 10);
  const page = extractQueryParam(req.query.page, -1);

  if (isNaN(group) || isNaN(amount) || isNaN(page)) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameter: the group, page or amount should be valid integer'
    );
  }
  let words = [];

  if (page !== -1) {
    words = await wordService.getAll({
      group,
      page
    });
  }

  let lackOfWords = amount - words.length;
  if (lackOfWords > 0 && page !== 0) {
    let minPage = 0;
    let maxPage = maxPagesInGroup;
    if (page !== -1) {
      minPage = page - Math.floor(amount / maxPagesInGroup);
      maxPage = page - 1;
    }
    const extraWords = await wordService.getAllPages({
      group,
      page: maxPage,
      minPage
    });

    if (page === -1) {
      words = words.concat(
        extraWords
          .sort(() => Math.random() - 0.5)
          .slice(0, lackOfWords > 0 ? lackOfWords : 0)
      );
    } else {
      words = words.concat(
        extraWords.slice(0, lackOfWords > 0 ? lackOfWords : 0)
      );
    }
  }
  lackOfWords = amount - words.length;
  if (lackOfWords > 0 && group > 0) {
    const extraWords = await wordService.getAllPages({
      group: group - 1,
      page,
      minPage: page - Math.floor(lackOfWords / maxPagesInGroup)
    });
    words = words.concat(
      extraWords.slice(0, lackOfWords > 0 ? lackOfWords : 0)
    );
  }

  const shuffledSplicedWords = words.sort(() => Math.random() - 0.5);

  res.status(OK).send(shuffledSplicedWords.map(word => word.toResponse()));
});

router.route('/:id').get(async (req, res) => {
  const word = await wordService.get(req.params.id);
  res.status(OK).send(word.toResponse());
});

module.exports = router;
