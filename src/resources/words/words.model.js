const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordsSchema = new Schema(
  {
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

module.exports = mongoose.model('Words', WordsSchema);
