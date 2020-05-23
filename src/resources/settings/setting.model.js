const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

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
      type: Object,
      required: false
    }
  },
  { collection: 'setting' }
);

addMethods(SettingsSchema);

module.exports = mongoose.model('Settings', SettingsSchema);
