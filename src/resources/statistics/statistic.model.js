const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  MAX_OPTIONAL_PROPERTIES,
  MAX_SYMBOLS_PER_OBJECT
} = require('../../common/config');
const { addMethods } = require('../../utils/toResponse');
const checkLimit = require('../../utils/checkLimits');

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
      type: Array,
      required: false,
      validate: [
        checkLimit,
        `{PATH} exceeds the limit of ${MAX_SYMBOLS_PER_OBJECT} symbols per object or has more than ${MAX_OPTIONAL_PROPERTIES} items`
      ]
    }
  },
  { collection: 'statistic' }
);

addMethods(StatisticSchema);

module.exports = mongoose.model('Statistic', StatisticSchema);
