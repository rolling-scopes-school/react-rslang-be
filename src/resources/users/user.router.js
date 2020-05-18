const { OK } = require('http-status-codes');
const router = require('express').Router();
const userService = require('./user.service');
const { id } = require('../../utils/validation/sсhemas');
const validator = require('../../utils/validation/validator');

router.get('/:id', validator(id, 'params'), async (req, res) => {
  const userEntity = await userService.get(req.params.id);
  res.status(OK).send(userEntity.toResponse());
});

router.put('/', async (req, res) => {
  const userEntity = await userService.update(req.authUserId, req.body);
  res.status(OK).send(userEntity.toResponse());
});

module.exports = router;
