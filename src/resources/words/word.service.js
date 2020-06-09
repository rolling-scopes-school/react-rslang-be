const wordRepo = require('./word.db.repository');

const getAll = async conditions => wordRepo.getAll(conditions);

const getCount = async (group, wordsPerExampleSentenceLTE) =>
  wordRepo.getCount(group, wordsPerExampleSentenceLTE);

const get = async wordId => wordRepo.get(wordId);

module.exports = { getAll, getCount, get };
