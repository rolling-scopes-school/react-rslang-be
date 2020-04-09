const router = require('express').Router();
const Model = require('./settings.model');
const wrapAsync = require('../../utils/wrapAsync');

router.route('/').get(
  wrapAsync(async (req, res) => {
    await Model.find({}, (err, docs) => {
      if (err) {
        throw err;
      } else {
        console.log(docs);
        res.status(200).send(docs);
      }
    });
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    await new Model({ ...req.body }).save((err, docs) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send(docs);
      }
    });
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    await Model.findById(req.params.id, (err, docs) => {
      if (err) {
        throw err;
      } else {
        console.log(docs);
        res.status(200).send(docs);
      }
    });
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    Model.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, docs) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send(docs);
      }
    });
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    Model.findByIdAndRemove(req.params.id, err => {
      if (err) {
        throw err;
      } else {
        res.status(200).send('Successfully deleted');
      }
    });
  })
);

module.exports = router;
