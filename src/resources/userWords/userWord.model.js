const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

const UserWordsSchema = new Schema(
  {
    wordId: { type: mongoose.Schema.Types.ObjectID, required: true },
    userId: { type: mongoose.Schema.Types.ObjectID, required: true },
    // необходимо для ведения пользовательской статистики слова в играх
    // сколько раз правильно выбрал / сколько раз ошибся
    stats: {
      wrongGameAnswersCount: { type: Number, required: false },
      correctGameAnswersCount: { type: Number, required: false }
    },
    // необходимо для формирования графиков изучения слов
    // нужно будет писать агрегации для формирования групп слов для каждой представленной даты
    learningStartDate: { type: Date, required: false },
    difficulty: { type: String, required: false }, // "hard" words
    isLearning: { type: Boolean, required: false },
    isDeleted: { type: Boolean, required: false },
    optional: {
      type: Object,
      required: false
    }
  },
  { collection: 'userWords' }
);

UserWordsSchema.index({ wordId: 1, userId: 1 }, { unique: true });

addMethods(UserWordsSchema);

module.exports = mongoose.model('UserWords', UserWordsSchema);
