const statisticRepo = require('./statistic.db.repository');

const get = async userId => statisticRepo.get(userId);

const save = async (userId, statistic) => statisticRepo.save(userId, statistic);

const upsert = async (userId, statistic) =>
  statisticRepo.upsert(userId, { ...statistic, userId });

const remove = async userId => statisticRepo.remove(userId);

module.exports = { get, upsert, remove, save };
