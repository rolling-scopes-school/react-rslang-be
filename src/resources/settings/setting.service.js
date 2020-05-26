const settingRepo = require('./setting.db.repository');

const get = async userId => settingRepo.get(userId);

const upsert = async (userId, statistic) =>
  settingRepo.upsert(userId, { ...statistic, userId });

module.exports = { get, upsert };
