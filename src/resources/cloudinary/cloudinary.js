require('dotenv').config();
const router = require('express').Router({ mergeParams: true });
const { cloudinaryUpload } = require('./services/cloudinary');
const { dataUri } = require('./services/data-uri');
const settingService = require('../settings/setting.service');
const { upload } = require('./services/multer');

const singleUpload = upload.single('image');

const singleUploadCtrl = (req, res, next) => {
  singleUpload(req, res, error => {
    if (error) {
      return res.sendApiError({ title: 'Upload Error', detail: error.message });
    }

    next();
  });
};

router.post('/', singleUploadCtrl, async (req, res) => {
  try {
    console.log(req.files);
    if (!req.files) {
      throw new Error('Image is not presented!');
    }
    const file64 = dataUri(req.files.file);
    const uploadResult = await cloudinaryUpload(file64.content);
    console.log(uploadResult);
    const setting = await settingService.upsert(req.userId, {
      optional: {
        imgUrl: uploadResult.url
      }
    });
    return res.json(setting);
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
});

module.exports = router;
