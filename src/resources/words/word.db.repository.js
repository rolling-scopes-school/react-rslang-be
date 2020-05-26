const Word = require('./word.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'word';

const getAll = async (page, group) => Word.find({ group, page });

const getCount = async () => Word.countDocuments({});

const get = async id => {
  const word = await Word.findOne({ _id: id });
  if (!word) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  return word;
};

module.exports = { getAll, getCount, get };
