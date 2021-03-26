const questionRepo = require('./question.db.repository');

const getAll = async () => questionRepo.getAll();

module.exports = { getAll };
