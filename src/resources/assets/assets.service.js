const fs = require('fs').promises;
const fs_ = require('fs');
const path = require('path');
const FormData = require('form-data');

const wordService = require('../words/word.service');

const get = async wordId => {
  const word = await wordService.get(wordId);
  const image = await fs.readFile(
    path.join(__dirname, `../../../${word.image}`),
    {
      encoding: 'base64'
    }
  );
  const audio = await fs.readFile(
    path.join(__dirname, `../../../${word.audio}`),
    {
      encoding: 'base64'
    }
  );
  console.log(new File());
  const data = new FormData();
  data.append(
    'image',
    fs_.createReadStream(path.join(__dirname, `../../../${word.image}`))
  );
  data.append('image', image.toString(), {
    filename: word.image,
    contentType: 'image/jpeg'
  });
  data.append('audio', audio.toString(), {
    filename: word.audio,
    contentType: 'audio/mpeg'
  });
  // new Response(data).formData().then(console.log);
  return data;
};

module.exports = { get };
