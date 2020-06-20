const wordRepo = require('./aggregatedWord.db.repository');

const getAll = async (userId, group, perPage, filter, onlyUserWords) =>
  wordRepo.getAll(userId, group, perPage, filter, onlyUserWords);

const get = async (wordId, userId) => wordRepo.get(wordId, userId);

module.exports = { getAll, get };
