const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();

const userService = require('./user.service');
const { id, user } = require('../../utils/validation/schemas');
const {
  validator,
  userIdValidator
} = require('../../utils/validation/validator');

router.post('/', validator(user, 'body'), async (req, res) => {
  const userEntity = await userService.save(req.body);

  if (userEntity && userEntity.error) {
    return res.status(417).json({
      error: {
        status: 'failed',
        errors: [
          {
            path: ['email'],
            message: userEntity.error
          }
        ]
      }
    });
  }

  res.status(OK).send(userEntity.toResponse());
});

router.get(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  async (req, res) => {
    const userEntity = await userService.get(req.params.id);
    res.status(OK).send(userEntity.toResponse());
  }
);

router.put(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  validator(user, 'body'),
  async (req, res) => {
    const userEntity = await userService.update(req.userId, req.body);
    res.status(OK).send(userEntity.toResponse());
  }
);

router.delete(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  async (req, res) => {
    await userService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  }
);

module.exports = router;
