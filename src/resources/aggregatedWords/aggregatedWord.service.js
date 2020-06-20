const wordRepo = require('./aggregatedWord.db.repository');

const getAll = async (userId, perPage, filter) =>
  wordRepo.getAll(userId, perPage, filter);

const get = async (wordId, userId) => wordRepo.get(wordId, userId);

module.exports = { getAll, get };
