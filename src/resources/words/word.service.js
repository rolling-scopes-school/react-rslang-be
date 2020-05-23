const wordRepo = require('./word.db.repository');

const getAll = async (page, group) => wordRepo.getAll(page, group);

const getCount = async () => wordRepo.getCount();

const get = async wordId => wordRepo.get(wordId);

module.exports = { getAll, getCount, get };
