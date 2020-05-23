const { OK } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const statisticService = require('./statistic.service');

router.route('/').get(async (req, res) => {
  const statistic = await statisticService.get(req.userId);
  res.status(OK).send(statistic.toResponse());
});

router.route('/').put(async (req, res) => {
  const statistic = await statisticService.upsert(req.userId, req.body);
  res.status(OK).send(statistic.toResponse());
});

module.exports = router;
