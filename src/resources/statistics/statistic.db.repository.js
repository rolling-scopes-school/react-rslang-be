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
    { $unwind: `$optional.gameStatistic.${[gameType]}.total.wordsId` },
    {
      $group: {
        _id: '$_id',

        gameWinTotal: {
          $sum: `$optional.gameStatistic.${[gameType]}.total.know`
        },
        gameLosTotal: {
          $sum: `$optional.gameStatistic.${[gameType]}.total.dont_know`
        },
        wordsCount: {
          $addToSet: `$optional.gameStatistic.${[gameType]}.total.wordsId`
        },
        maxCombo: { $max: `$optional.gameStatistic.${[gameType]}.total.combo` },
        gameCount: { $sum: 1 }
      }
    },
    {
      $addFields: {
        gameType: [gameType]
      }
    },
    {
      $project: {
        _id: 0,
        gameType: '$gameType',
        gameCount: '$gameCount',
        wordsCountArr: '$wordsCount',
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

const getTotalStat = async (userId, gameType) => {
  // const dateField = `optional.gameStatistic.${[gameType]}.total.date`;
  console.log(userId, gameType);
  const statistic = await Statistics.aggregate([
    {
      $match: {
        userId
      }
    },
    {
      $unwind: {
        path: '$optional.gameStatistic.savanna',
        preserveNullAndEmptyArrays: true
      }
    },

    {
      $unwind: {
        path: '$optional.gameStatistic.sprint',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$optional.gameStatistic.constructors',
        preserveNullAndEmptyArrays: true
      }
    },

    {
      $unwind: {
        path: '$optional.gameStatistic.audiocall',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: '$optional.gameStatistic.sprint.total.date',
        wordsCount: {
          $addToSet: '$optional.gameStatistic.sprint.total.wordsId'
        }
      }
    }
    // {
    //   $group: {
    //     _id: '$optional.gameStatistic.savanna.total.date',

    //     wordsCount: {
    //       $addToSet: '$optional.gameStatistic.savanna.total.wordsId'
    //     }
    //   }
    // }
    //   $match: {
    //     [dateField]: {
    //       $gte: today.toDate(),
    //       $lte: moment(today)
    //         .endOf('day')
    //         .toDate()
    //     }
    //   }
    // },
    // { $unwind: `$optional.gameStatistic.${[gameType]}.total.wordsId` },
    // {
    //   $group: {
    //     _id: '$_id',

    //     gameWinTotal: {
    //       $sum: `$optional.gameStatistic.${[gameType]}.total.know`
    //     },
    //     gameLosTotal: {
    //       $sum: `$optional.gameStatistic.${[gameType]}.total.dont_know`
    //     },
    //     wordsCount: {
    //       $addToSet: `$optional.gameStatistic.${[gameType]}.total.wordsId`
    //     },
    //     maxCombo: { $max: `$optional.gameStatistic.${[gameType]}.total.combo` },
    //     gameCount: { $sum: 1 }
    //   }
    // },
    // {
    //   $addFields: {
    //     gameType: [gameType]
    //   }
    // },
    // {
    //   $project: {
    //     _id: 0,
    //     gameType: '$gameType',
    //     gameCount: '$gameCount',
    //     wordsCountArr: '$wordsCount',
    //     correctAvg: {
    //       $trunc: [
    //         {
    //           $divide: [
    //             {
    //               $multiply: [100, '$gameWinTotal']
    //             },
    //             {
    //               $sum: ['$gameWinTotal', '$gameLosTotal']
    //             }
    //           ]
    //         },
    //         0
    //       ]
    //     },
    //     maxCombo: '$maxCombo'
    //   }
    // }
  ]);

  if (!statistic) {
    throw new NOT_FOUND_ERROR('statistic', `userId: ${userId}`);
  }
  console.log(statistic);
  return statistic;
};

const remove = async userId => Statistics.deleteOne({ userId });

module.exports = { get, upsert, remove, pushStat, getStat, getTotalStat };
