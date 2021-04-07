const { OK } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const statisticService = require('./statistic.service');
const { statistics } = require('../../utils/validation/schemas');
const { validator } = require('../../utils/validation/validator');

router.get('/', async (req, res) => {
  const statistic = await statisticService.get(req.userId);
  res.status(OK).send(statistic.toResponse());
});

router.put('/', validator(statistics, 'body'), async (req, res) => {
  const statistic = await statisticService.upsert(req.userId, req.body);
  res.status(OK).send(statistic.toResponse());
});

router.put('/gameadd/:id', validator(statistics, 'body'), async (req, res) => {
  const statistic = await statisticService.pushStat(
    req.userId,
    req.params.id,
    req.body
  );
  res.status(OK).send(statistic.toResponse());
});

router.get('/gamedata/:date/gameType/:type', async (req, res) => {
  const statistic = await statisticService.getStat(
    req.userId,
    req.params.date,
    req.params.type
  );

  res.status(OK).send(statistic);
});

router.get('/gametotal/gameType/:type', async (req, res) => {
  const statistic = await statisticService.getTotalStat(
    req.userId,
    req.params.type
  );

  res.status(OK).send(statistic);
});

module.exports = router;
