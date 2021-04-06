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
        savanna: {
          total: [
            {
              date: Date,
              gameType: String,
              know: Number,
              dont_know: Number,
              combo: Number,
              wordsId: [String]
            }
          ],
          forDate: []
        },
        sprint: {
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
        },

        audiocall: {
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
        },
        constructors: {
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
    }
  },

  { collection: 'statistic' }
);

addMethods(StatisticSchema);

module.exports = mongoose.model('Statistic', StatisticSchema);
