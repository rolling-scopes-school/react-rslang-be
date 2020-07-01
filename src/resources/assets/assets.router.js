const router = require('express').Router({ mergeParams: true });

const assetsService = require('./assets.service');

router.route('/').get(async (req, res) => {
  const assets = await assetsService.get(req.params.id);
  res.setHeader(
    'x-Content-Type',
    `multipart/form-data; boundary=${assets._boundary}`
  );
  assets.pipe(res);
});

module.exports = router;
