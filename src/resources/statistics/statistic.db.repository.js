const Statistics = require('./statistic.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');

const get = async userId => {
  const statistic = await Statistics.findOne({ userId });
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

const pushStat = async (userId, gameType, statistic) => {
  console.log(statistic.optional.gameStatistic[gameType].total[0], gameType);
  const set = `optional.gameStatistic.${gameType}.total`;
  return Statistics.findOneAndUpdate(
    { userId },
    {
      $push: {
        [set]: statistic.optional.gameStatistic[gameType].total[0]
      }
    },
    { upsert: true }
  );
};

const remove = async userId => Statistics.deleteOne({ userId });

module.exports = { get, upsert, remove, pushStat };
