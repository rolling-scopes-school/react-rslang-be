const moment = require('moment');
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

const getStat = async (userId, date, gameType) => {
  const today = moment(date);
  const dateField = `optional.gameStatistic.${[gameType]}.total.date`;
  const statistic = await Statistics.aggregate([
    {
      $match: {
        userId
      }
    },
    { $unwind: `$optional.gameStatistic.${[gameType]}.total` },
    {
      $match: {
        [dateField]: {
          $gte: today.toDate(),
          $lte: moment(today)
            .endOf('day')
            .toDate()
        }
      }
    },
    {
      $group: {
        _id: '$_id',

        gameWinTotal: {
          $sum: `$optional.gameStatistic.${[gameType]}.total.know`
        },
        gameLosTotal: {
          $sum: `$optional.gameStatistic.${[gameType]}.total.dont_know`
        },
        maxCombo: { $max: `$optional.gameStatistic.${[gameType]}.total.combo` },
        count: { $sum: 1 }
      }
    }
  ]);

  console.log(statistic);
  if (!statistic) {
    throw new NOT_FOUND_ERROR('statistic', `userId: ${userId}`);
  }

  return statistic;
};

const remove = async userId => Statistics.deleteOne({ userId });

module.exports = { get, upsert, remove, pushStat, getStat };
