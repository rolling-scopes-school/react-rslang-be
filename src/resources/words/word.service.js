const fs = require('fs').promises;
const path = require('path');

const wordRepo = require('./word.db.repository');

const getAll = async conditions => wordRepo.getAll(conditions);

const getQuantity = async (group, wordsPerExampleSentenceLTE) =>
  wordRepo.getQuantity(group, wordsPerExampleSentenceLTE);

const get = async (wordId, noAssets) => {
  const word = await wordRepo.get(wordId);

  if (!noAssets) {
    word.image = await fs.readFile(
      path.join(__dirname, `../../../${word.image}`),
      {
        encoding: 'base64'
      }
    );

    word.audio = await fs.readFile(
      path.join(__dirname, `../../../${word.audio}`),
      {
        encoding: 'base64'
      }
    );

    word.audioMeaning = await fs.readFile(
      path.join(__dirname, `../../../${word.audioMeaning}`),
      {
        encoding: 'base64'
      }
    );

    word.audioExample = await fs.readFile(
      path.join(__dirname, `../../../${word.audioExample}`),
      {
        encoding: 'base64'
      }
    );
  }

  return word;
};

module.exports = { getAll, getQuantity, get };
