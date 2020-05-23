const statisticRepo = require('./statistic.db.repository');

const get = async userId => statisticRepo.get(userId);

const upsert = async (userId, statistic) =>
  statisticRepo.upsert(userId, { ...statistic, userId });

module.exports = { get, upsert };
