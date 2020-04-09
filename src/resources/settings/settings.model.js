const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MAX_SYMBOLS_PER_OBJECT = 1000;
const MAX_OPTIONAL_PROPERTIES = 30;

const checkLimit = obj =>
  obj.length <= MAX_OPTIONAL_PROPERTIES &&
  JSON.stringify(obj).length <= MAX_SYMBOLS_PER_OBJECT;

const SettingsSchema = new Schema(
  {
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
  { collection: 'settings' }
);

module.exports = mongoose.model('Settings', SettingsSchema);
