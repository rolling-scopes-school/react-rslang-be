const taskRepo = require('./task.memory.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const get = (boardId, id) => taskRepo.get(boardId, id);

const remove = (boardId, id) => taskRepo.remove(boardId, id);

const save = task => taskRepo.save(task);

const update = task => taskRepo.update(task);

module.exports = { getAll, get, remove, save, update };
