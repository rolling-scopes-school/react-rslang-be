const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const boardService = require('./task.service');
const wrapAsync = require('../../utils/wrapAsync');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const boards = await boardService.getAll(req.params.boardId);
    await res.json(boards);
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const board = await boardService.get(req.params.boardId, req.params.id);
    res.status(200).send(board);
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    await boardService.remove(req.params.boardId, req.params.id);
    res.sendStatus(200);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const board = await boardService.save(
      Task.fromRequest({ ...req.body, boardId: req.params.boardId })
    );
    res.status(200).send(board);
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const board = await boardService.update(
      Task.fromRequest({
        ...req.body,
        id: req.params.id,
        boardId: req.params.boardId
      })
    );
    res.status(200).send(board);
  })
);

module.exports = router;
