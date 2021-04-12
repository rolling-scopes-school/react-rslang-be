const Word = require('./word.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'word';

const getAll = async conditions => {
  const { group, page, sort } = conditions;
  if (sort) {
    return Word.find({ group, page }).sort({ page: 1, word: 1 });
  }
  return Word.find({ group, page });
};

const getAllPages = async conditions => {
  const { group, page, minPage } = conditions;
  return Word.find({
    group,
    page: { $lte: page, $gte: minPage }
  });
};

const get = async id => {
  const word = await Word.findOne({ _id: id });
  if (!word) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return word;
};

module.exports = { getAll, get, getAllPages };
