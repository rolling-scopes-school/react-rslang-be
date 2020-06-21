const wordRepo = require('./aggregatedWord.db.repository');

const getAll = async (userId, group, perPage, filter) =>
  wordRepo.getAll(userId, group, perPage, filter);

const get = async (wordId, userId) => wordRepo.get(wordId, userId);

module.exports = { getAll, get };
