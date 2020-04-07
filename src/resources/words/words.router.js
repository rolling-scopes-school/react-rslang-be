const router = require('express').Router();
const WordsModel = require('./words.model');
// const userService = require('./words.service');
const wrapAsync = require('../../utils/wrapAsync');

router.route('/').get(
  wrapAsync(async (req, res) => {
    WordsModel.find({}, (err, docs) => {
      if (!err) {
        console.log(docs);
        res.status(200).send(docs);
      } else {
        throw err;
      }
    });
  })
);
/*

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    // const word = await userService.get(req.params.id);
    // res.status(200).send(WordsModel.toResponse(word));
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    // await userService.remove(req.params.id);
    // res.sendStatus(200);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    // const word = await userService.save(WordsModel.fromRequest(req.body));
    // res.status(200).send(WordsModel.toResponse(word));
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    // const word = await userService.update(
    //   req.params.id,
    //   WordsModel.fromRequest(req.body)
    // );
    // res.status(200).send(WordsModel.toResponse(word));
  })
);
*/

module.exports = router;
