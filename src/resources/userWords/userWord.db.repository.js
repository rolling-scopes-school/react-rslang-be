const UserWord = require('./userWord.model');
const { NOT_FOUND_ERROR, ENTITY_EXISTS } = require('../../errors/appErrors');
const ENTITY_NAME = 'user word';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

const getAll = async userId => UserWord.find({ userId });

const get = async (wordId, userId) => {
  const userWord = await UserWord.findOne({ wordId, userId });
  if (!userWord) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { wordId, userId });
  }

  return userWord;
};

const save = async (wordId, userId, userWord) => {
  try {
    return await UserWord.create(userWord);
  } catch (err) {
    if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
      throw new ENTITY_EXISTS(`such ${ENTITY_NAME} already exists`);
    } else {
      throw err;
    }
  }
};

const update = async (wordId, userId, userWord) =>
  UserWord.findOneAndUpdate(
    { wordId, userId },
    { $set: userWord },
    { new: true }
  );

const remove = async (wordId, userId) => UserWord.deleteOne({ wordId, userId });

module.exports = { getAll, get, save, update, remove };
