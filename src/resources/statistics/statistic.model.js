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
              date: Number,
              level: String,
              know: Number,
              dont_know: Number
            }
          ]
        },
        sprint: {
          total: [
            {
              date: Number,
              level: String,
              know: Number,
              dont_know: Number
            }
          ]
        },

        audiocall: {
          total: [
            {
              date: Number,
              level: String,
              know: Number,
              dont_know: Number
            }
          ]
        },
        constructors: {
          total: [
            {
              date: Number,
              level: String,
              know: Number,
              dont_know: Number
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
