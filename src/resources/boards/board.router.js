const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const wrapAsync = require('../../utils/wrapAsync');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const boards = await boardService.getAll();
    await res.json(boards);
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const board = await boardService.get(req.params.id);
    res.status(200).send(board);
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    await boardService.remove(req.params.id);
    res.sendStatus(200);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const board = await boardService.save(Board.fromRequest(req.body));
    res.status(200).send(board);
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const board = await boardService.update(Board.fromRequest(req.body));
    res.status(200).send(board);
  })
);

module.exports = router;
