const router = require('express').Router();
const WordsModel = require('./word.model');
const UserWordsModel = require('./userWord.model');
const wrapAsync = require('../../utils/wrapAsync');
const { MAX_PER_PAGE, PER_PAGE } = require('../../common/config');
const { BadRequest } = require('../../errors/appErrors');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const page = req.query.page ? +req.query.page : 0;
    const perPage =
      req.query.perPage && req.query.perPage <= MAX_PER_PAGE
        ? +req.query.perPage
        : PER_PAGE;

    if (isNaN(page) || isNaN(perPage)) {
      throw new BadRequest(
        'Wrong query parameters, the page and per page numbers should be valid integers'
      );
    }

    WordsModel.find()
      .sort({ word: 1 })
      .skip(page * perPage)
      .limit(perPage)
      .exec({}, (err, docs) => {
        if (!err) {
          res.status(200).send(docs);
        } else {
          throw err;
        }
      });
  })
);

router.route('/count').get(
  wrapAsync(async (req, res) => {
    WordsModel.countDocuments({}, (err, count) => {
      if (!err) {
        res.status(200).send({ count });
      } else {
        throw err;
      }
    });
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const userId = req.query.userId;
    const wordId = req.params.id;

    if (!userId) {
      throw new BadRequest('A user id should be specified');
    }

    await UserWordsModel.findOne({ wordId, userId }, (err, docs) => {
      if (err) {
        throw err;
      } else {
        console.log(docs);
        res.status(200).send(docs);
      }
    });
  })
);

router.route('/:id').post(
  wrapAsync(async (req, res) => {
    const userId = req.query.userId;
    const wordId = req.params.id;

    if (!userId) {
      throw new BadRequest('A user id should be specified');
    }

    await new UserWordsModel({ ...req.body, wordId, userId }).save(
      (err, docs) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send(docs);
        }
      }
    );
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const userId = req.query.userId;
    const wordId = req.params.id;

    if (!userId) {
      throw new BadRequest('A user id should be specified');
    }

    UserWordsModel.findOneAndUpdate(
      { wordId, userId },
      { $set: req.body },
      (err, docs) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send(docs);
        }
      }
    );
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    const userId = req.query.userId;
    const wordId = req.params.id;

    if (!userId) {
      throw new BadRequest('A user id should be specified');
    }

    UserWordsModel.findByIdAndRemove({ wordId, userId }, err => {
      if (err) {
        throw err;
      } else {
        res.status(200).send('Successfully deleted');
      }
    });
  })
);

module.exports = router;
