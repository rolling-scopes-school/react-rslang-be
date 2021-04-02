const Statistics = require('./statistic.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');

const get = async userId => {
  const statistic = await Statistics.find({ userId });
  if (!statistic) {
    throw new NOT_FOUND_ERROR('statistic', `userId: ${userId}`);
  }

  return statistic;
};

const upsert = async (userId, statistic) =>
  Statistics.findOneAndUpdate(
    { userId },
    { $set: statistic },
    { upsert: true, new: true }
  );

const save = async (userId, statistic) => {
  return await Statistics.create({ userId, ...statistic });
};

const remove = async userId => Statistics.deleteOne({ userId });

module.exports = { get, upsert, remove, save };
