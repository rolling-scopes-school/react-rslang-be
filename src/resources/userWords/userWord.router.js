const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });

const userWordService = require('./userWord.service');

router.route('/').get(async (req, res) => {
  const userWords = await userWordService.getAll(req.userId);
  res.status(OK).send(userWords.map(w => w.toResponse()));
});

router.route('/:wordId').get(async (req, res) => {
  const userWord = await userWordService.get(req.params.wordId, req.userId);
  res.status(OK).send(userWord.toResponse());
});

router.route('/:wordId').post(async (req, res) => {
  const userId = req.userId;
  const wordId = req.params.wordId;
  const userWord = await userWordService.save(wordId, userId, req.body);
  res.status(OK).send(userWord.toResponse());
});

router.route('/:wordId').put(async (req, res) => {
  const userId = req.userId;
  const wordId = req.params.wordId;
  const userWord = await userWordService.update(wordId, userId, req.body);
  res.status(OK).send(userWord.toResponse());
});

router.route('/:wordId').delete(async (req, res) => {
  await userWordService.remove(req.params.wordId, req.userId);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
