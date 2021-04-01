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
      type: Number,
      required: true
    },
    date: {
      type: Number,
      required: true
    },
    gameId: {
      type: String,
      required: true
    },
    rightAnswers: {
      type: Number,
      required: true
    },
    wrongAnswers: {
      type: Number,
      required: true
    },
    maxSerie: {
      type: Number,
      required: true
    }
  },
  { collection: 'statistic' }
);

addMethods(StatisticSchema);

module.exports = mongoose.model('Statistic', StatisticSchema);
