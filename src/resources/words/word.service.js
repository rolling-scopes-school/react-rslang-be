const wordRepo = require('./word.db.repository');

const getAll = async conditions => wordRepo.getAll(conditions);

const getQuantity = async group => wordRepo.getQuantity(group);

const get = async wordId => {
  const word = await wordRepo.get(wordId);

  return word;
};

module.exports = { getAll, getQuantity, get };
