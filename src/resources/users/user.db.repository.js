const User = require('./user.model');
const { NOT_FOUND_ERROR, USER_EXISTS } = require('../../errors/appErrors');
const ENTITY_NAME = 'user';

const getUserByEmail = async email => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { email });
  }

  return user;
};

const get = async id => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  return user;
};

const save = async user => {
  try {
    return await User.create(user);
  } catch (err) {
    if (err.code === 11000) {
      throw new USER_EXISTS(null, null, 'User with this email exists');
    }
  }
};

const update = async (id, user) =>
  User.findOneAndUpdate({ _id: id }, { $set: user }, { new: true });

module.exports = { get, getUserByEmail, save, update };
