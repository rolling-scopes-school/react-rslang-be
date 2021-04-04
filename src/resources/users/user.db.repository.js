const User = require('./user.model');
const cloudinary = require('cloudinary').v2;
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'user';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

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

const save = async req => {
  const { body: user, files } = req;
  try {
    const condidate = await User.findOne({ email: user.email });

    if (condidate) {
      throw { code: MONGO_ENTITY_EXISTS_ERROR_CODE };
    }

    if (files && files.avatar && files.avatar.path) {
      const avatar = await cloudinary.uploader.upload(files.avatar.path, {
        upload_preset: 'rslang-avatart'
      });
      if (avatar.secure_url) {
        return await User.create({ ...user, avatar: avatar.secure_url });
      }
    }

    return await User.create({ ...user, avatar: '' });
  } catch (err) {
    if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
      return { error: 'User with this e-mail exists' };
    }
    throw err;
  }
};

const update = async (id, user) =>
  User.findOneAndUpdate({ _id: id }, { $set: user }, { new: true });

const remove = async id => User.deleteOne({ _id: id });

module.exports = { get, getUserByEmail, save, update, remove };
