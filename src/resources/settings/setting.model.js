const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  MAX_OPTIONAL_PROPERTIES,
  MAX_SYMBOLS_PER_OBJECT
} = require('../../common/config');
const { addMethods } = require('../../utils/toResponse');
const checkLimit = require('../../utils/checkLimits');

const SettingsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    wordsPerDay: {
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
  { collection: 'setting' }
);

addMethods(SettingsSchema);

module.exports = mongoose.model('Settings', SettingsSchema);
