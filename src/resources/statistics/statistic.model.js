const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

const StatisticSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    learnedWords: {
      type: Number
    },
    optional: {
      gameStatistic: {
        total: [
          {
            date: Date,
            gameType: String,
            know: Number,
            dont_know: Number,
            combo: Number,
            wordsId: [String]
          }
        ]
      }
    }
  },

  { collection: 'statistic' }
);

addMethods(StatisticSchema);

module.exports = mongoose.model('Statistic', StatisticSchema);
