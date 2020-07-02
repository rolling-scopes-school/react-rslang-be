const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Token = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectID,
      required: true
    },
    tokenId: { type: String, required: true },
    expire: { type: Number, required: true }
  },
  { collection: 'tokens' }
);

Token.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model('tokens', Token);
