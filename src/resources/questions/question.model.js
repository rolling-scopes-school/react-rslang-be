const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

const QuestionSchema = new Schema(
  {
    question: { type: String, required: true },
    answers: [{ answer: String, isCorrect: Boolean }],
    image: String,
    answer: String,
    isCorrect: Boolean
  },
  { collection: 'question' }
);

addMethods(QuestionSchema);

module.exports = mongoose.model('Question', QuestionSchema);
