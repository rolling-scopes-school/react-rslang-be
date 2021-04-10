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
  const set = 'optional.gameStatistic.total';

  return Statistics.findOneAndUpdate(
    { userId },
    {
      $push: {
        [set]: statistic.optional.gameStatistic.total[0]
      }
    },
    { upsert: true }
  );
};

const getStat = async (userId, date) => {
  const today = moment(new Date(date));
  const statistic = await Statistics.aggregate([
    {
      $match: { userId }
    },
    { $unwind: '$optional.gameStatistic.total' },
    {
      $match: {
        'optional.gameStatistic.total.date': {
          $gte: today.toDate(),
          $lte: moment(today)
            .endOf('day')
            .toDate()
        }
      }
    },

    {
      $group: {
        _id: '$optional.gameStatistic.total.gameType',

        gameWinTotal: {
          $sum: '$optional.gameStatistic.total.know'
        },
        gameLosTotal: {
          $sum: '$optional.gameStatistic.total.dont_know'
        },

        wordsCount: {
          $addToSet: '$optional.gameStatistic.total.wordsId'
        },
        maxCombo: { $max: '$optional.gameStatistic.total.combo' },
        gameCount: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        gameType: '$_id',
        gameCount: '$gameCount',
        wordsCountArr: {
          $reduce: {
            input: '$wordsCount',
            initialValue: [],
            in: { $concatArrays: ['$$value', '$$this'] }
          }
        },
        correctAvg: {
          $trunc: [
            {
              $divide: [
                {
                  $multiply: [100, '$gameWinTotal']
                },
                {
                  $sum: ['$gameWinTotal', '$gameLosTotal']
                }
              ]
            },
            0
          ]
        },
        maxCombo: '$maxCombo'
      }
    }
  ]);

  if (!statistic) {
    throw new NOT_FOUND_ERROR('statistic', `userId: ${userId}`);
  }

  return statistic;
};

const getTotalStat = async userId => {
  const statistic = await Statistics.aggregate([
    {
      $match: {
        userId
      }
    },
    {
      $unwind: {
        path: '$optional.gameStatistic.total',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: '$optional.gameStatistic.total.date',
        wordsCount: {
          $addToSet: '$optional.gameStatistic.total.wordsId'
        }
      }
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        wordsCountArr: {
          $reduce: {
            input: '$wordsCount',
            initialValue: [],
            in: { $concatArrays: ['$$value', '$$this'] }
          }
        }
      }
    },
    {
      $sort: { date: 1 }
    }
  ]);

  if (!statistic) {
    throw new NOT_FOUND_ERROR('statistic', `userId: ${userId}`);
  }

  return statistic;
};

const remove = async userId => Statistics.deleteOne({ userId });

module.exports = { get, upsert, remove, pushStat, getStat, getTotalStat };
