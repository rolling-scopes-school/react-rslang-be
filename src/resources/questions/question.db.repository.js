const Question = require('./question.model');

const getAll = async () => {
  return Question.find();
};

module.exports = { getAll };
