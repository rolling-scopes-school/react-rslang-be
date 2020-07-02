const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { addMethods } = require('../../utils/toResponse');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8
    }
  },
  { collection: 'users' }
);

User.pre('save', async function preSave(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

User.pre('findOneAndUpdate', async function preUpdate(next) {
  this._update.$set.password = await bcrypt.hash(
    this._update.$set.password,
    10
  );
  next();
});

addMethods(User);

module.exports = mongoose.model('users', User);
