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
              combo: Number
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
              combo: Number
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
              combo: Number
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
              combo: Number
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
