const { OK } = require('http-status-codes');
const router = require('express').Router();
const userService = require('./user.service');
const { user } = require('../../utils/validation/sсhemas');
const validator = require('../../utils/validation/validator');

router.post('/', validator(user, 'body'), async (req, res) => {
  const userEntity = await userService.save(req.body);
  res.status(OK).send(userEntity.toResponse());
});

module.exports = router;
