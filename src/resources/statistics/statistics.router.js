const router = require('express').Router();
const Model = require('./statistics.model');

router.route('/').get(async (req, res) => {
  await Model.find({}, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(docs);
    }
  });
});

router.route('/').post(async (req, res) => {
  await new Model({ ...req.body }).save((err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(docs);
    }
  });
});

router.route('/:id').get(async (req, res) => {
  await Model.findById(req.params.id, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(docs);
    }
  });
});

router.route('/:id').put(async (req, res) => {
  Model.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, docs) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(docs);
    }
  });
});

router.route('/:id').delete(async (req, res) => {
  Model.findByIdAndRemove(req.params.id, err => {
    if (err) {
      throw err;
    } else {
      res.status(200).send('Successfully deleted');
    }
  });
});

module.exports = router;
