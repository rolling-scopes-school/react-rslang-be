const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  MAX_OPTIONAL_PROPERTIES,
  MAX_SYMBOLS_PER_OBJECT
} = require('../../common/config');
const checkLimit = require('../../utils/checkLimits');

const UserWordsSchema = new Schema(
  {
    wordId: { type: String, required: true },
    userId: { type: String, required: true },
    difficulty: { type: String, required: false },
    optional: {
      type: Array,
      required: false,
      validate: [
        checkLimit,
        `{PATH} exceeds the limit of ${MAX_SYMBOLS_PER_OBJECT} symbols per object or has more than ${MAX_OPTIONAL_PROPERTIES} items`
      ]
    }
  },
  { collection: 'userWords' }
);

module.exports = mongoose.model('UserWords', UserWordsSchema);
