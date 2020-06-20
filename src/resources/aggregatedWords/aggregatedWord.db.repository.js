const mongoose = require('mongoose');

const Word = require('../words/word.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'user word';

const lookup = {
  $lookup: {
    from: 'userWords',
    let: { word_id: '$_id' },
    pipeline: [
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ['$userId', null] },
              { $eq: ['$wordId', '$$word_id'] }
            ]
          }
        }
      }
    ],
    as: 'userWord'
  }
};

const pipeline = [
  {
    $unwind: {
      path: '$userWord',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $unset: [
      '__v',
      'userWord._id',
      'userWord.wordId',
      'userWord.userId',
      'userWord.__v'
    ]
  }
];

const getAll = async (userId, group, perPage, filter, onlyUserWords) => {
  lookup.$lookup.pipeline[0].$match.$expr.$and[0].$eq[1] = mongoose.Types.ObjectId(
    userId
  );

  const match = {
    $match: {
      $and: [
        {
          $or: [{ userWord: { $exists: onlyUserWords } }]
        },
        { group }
      ]
    }
  };

  if (filter) {
    match.$match.$and[0].$or.push(filter);
  }

  const facet = {
    $facet: {
      paginatedResults: [{ $limit: perPage }],
      totalCount: [
        {
          $count: 'count'
        }
      ]
    }
  };
  return await Word.aggregate([lookup, ...pipeline, match, facet]);
};

const get = async (wordId, userId) => {
  lookup.$lookup.pipeline[0].$match.$expr.$and[0].$eq[1] = mongoose.Types.ObjectId(
    userId
  );

  const match = {
    $match: {
      _id: mongoose.Types.ObjectId(wordId)
    }
  };

  const userWord = await Word.aggregate([match, lookup, ...pipeline]);
  if (!userWord) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { wordId, userId });
  }

  return userWord;
};

module.exports = { getAll, get };
