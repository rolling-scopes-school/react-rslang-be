const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const remove = id => boardsRepo.remove(id);

const save = board => boardsRepo.save(board);

const update = board => boardsRepo.update(board.id, board);

module.exports = { getAll, get, remove, save, update };
