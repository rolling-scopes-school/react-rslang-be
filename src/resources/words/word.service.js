const wordRepo = require('./word.db.repository');

const getAll = async conditions => wordRepo.getAll(conditions);

const getQuantity = async (group, wordsPerExampleSentenceLTE) =>
  wordRepo.getQuantity(group, wordsPerExampleSentenceLTE);

const get = async wordId => wordRepo.get(wordId);

module.exports = { getAll, getQuantity, get };
