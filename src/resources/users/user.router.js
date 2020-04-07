const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');
const wrapAsync = require('../../utils/wrapAsync');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const users = await userService.getAll();
    await res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const user = await userService.get(req.params.id);
    res.status(200).send(User.toResponse(user));
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    await userService.remove(req.params.id);
    res.sendStatus(200);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const user = await userService.save(User.fromRequest(req.body));
    res.status(200).send(User.toResponse(user));
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const user = await userService.update(
      req.params.id,
      User.fromRequest(req.body)
    );
    res.status(200).send(User.toResponse(user));
  })
);

module.exports = router;
