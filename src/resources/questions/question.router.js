const { OK } = require('http-status-codes');
const router = require('express').Router();

const questionService = require('./question.service');

router.get('/', async (req, res) => {
  const questions = await questionService.getAll();

  res.status(OK).send(questions.map(question => question.toResponse()));
});

module.exports = router;
