const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { OK } = require('http-status-codes');

const { JWT_SECRET_KEY, JWT_EXPIRE_TIME } = require('../../common/config');
const userService = require('../users/user.service');

router.route('/').post(async (req, res) => {
  const user = await userService.authenticate(req.body);

  const token = jwt.sign(user, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE_TIME
  });
  res.status(OK).json({
    message: 'Authenticated',
    token,
    userId: user.id
  });
});

module.exports = router;
