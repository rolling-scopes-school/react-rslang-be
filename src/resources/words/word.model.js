const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordsSchema = new Schema(
  {
    group: { type: Number, required: true },
    page: { type: Number, required: true },
    word: { type: String, required: true, max: 100 },
    image: { type: String, required: false, max: 150 },
    audio: { type: String, required: false, max: 150 },
    audioMeaning: { type: String, required: false, max: 150 },
    audioExample: { type: String, required: false, max: 150 },
    textMeaning: { type: String, required: false, max: 300 },
    textExample: { type: String, required: false, max: 300 },
    transcription: { type: String, required: false, max: 100 }
  },
  { collection: 'words' }
);

const toResponse = w => {
  const {
    word,
    image,
    audio,
    audioMeaning,
    audioExample,
    textMeaning,
    textExample,
    transcription
  } = w;
  return {
    word,
    image,
    audio,
    audioMeaning,
    audioExample,
    textMeaning,
    textExample,
    transcription
  };
};

const Words = mongoose.model('Words', WordsSchema);
module.exports = { Words, toResponse };
