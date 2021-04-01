const { OK } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const statisticService = require('./statistic.service');
const { statistics } = require('../../utils/validation/schemas');
const { validator } = require('../../utils/validation/validator');

router.get('/', async (req, res) => {
  const statistic = await statisticService.get(req.userId);
  res.status(OK).send(statistic.toResponse());
});

router.post('/', validator(statistics, 'body'), async (req, res) => {
  console.log(req.body);
  const statistic = await statisticService.save(req.userId, req.body);
  res.status(OK).send(statistic);
});

router.put('/', validator(statistics, 'body'), async (req, res) => {
  const statistic = await statisticService.upsert(req.userId, req.body);
  res.status(OK).send(statistic.toResponse());
});

module.exports = router;
