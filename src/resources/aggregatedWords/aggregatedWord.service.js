const wordRepo = require('./aggregatedWord.db.repository');

const getAll = async (userId, page, perPage, filter) =>
  wordRepo.getAll(userId, page, perPage, filter);

const get = async (wordId, userId) => wordRepo.get(wordId, userId);

module.exports = { getAll, get };
