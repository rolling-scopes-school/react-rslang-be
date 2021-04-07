const statisticRepo = require('./statistic.db.repository');

const get = async userId => statisticRepo.get(userId);

const getStat = async (userId, date, gameType) =>
  statisticRepo.getStat(userId, date, gameType);

const getTotalStat = async (userId, gameType) =>
  statisticRepo.getTotalStat(userId, gameType);

const upsert = async (userId, statistic) =>
  statisticRepo.upsert(userId, { ...statistic, userId });

const pushStat = async (userId, gameType, statistic) =>
  statisticRepo.pushStat(userId, gameType, { ...statistic, userId });

const remove = async userId => statisticRepo.remove(userId);

module.exports = { get, upsert, remove, pushStat, getStat, getTotalStat };
