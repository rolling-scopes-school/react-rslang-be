const multer = require('multer');

const ALLOWED_FORMAT = ['image/jpeg', 'image/png', 'image/jpg'];

const storage = multer.memoryStorage();
exports.upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (ALLOWED_FORMAT.includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(new Error('Not supported file format!'), false);
  }
});
