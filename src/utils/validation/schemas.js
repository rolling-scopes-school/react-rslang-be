const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const {
  MAX_OPTIONAL_PROPERTIES,
  MAX_SYMBOLS_PER_OBJECT
} = require('../../common/config');

const SYMBOLS_REGEX = /[-+_@$!%*?&#.,;:[\]{}]/;

const optionalScheme = Joi.object()
  .max(MAX_OPTIONAL_PROPERTIES)
  .pattern(/.*/, [Joi.string(), Joi.number(), Joi.boolean(), Joi.date()])
  .custom(optionalValidator, 'optional object validation')
  .error(errors => {
    errors
      .filter(err => err.code === 'object.length')
      .forEach(
        err =>
          (err.message = `Optional field exceeds the limit of ${MAX_SYMBOLS_PER_OBJECT} symbols per object`)
      );
    return errors;
  });

const schemas = {
  id: Joi.object({ id: Joi.objectId() }),
  wordId: Joi.object({ id: Joi.objectId(), wordId: Joi.objectId() }),
  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      email: Joi.string().email({ tlds: { allow: false } }),
      password: Joi.string().custom((value, helpers) => {
        const password = value.trim();

        if (password.length < 8) {
          return helpers.error('any.invalid');
        }

        if (!SYMBOLS_REGEX.test(password)) {
          return helpers.error('any.invalid');
        }

        if (!/[0-9]/.test(password)) {
          return helpers.error('any.invalid');
        }

        if (!/[A-Z]/.test(password)) {
          return helpers.error('any.invalid');
        }

        if (!/[a-z]/.test(password)) {
          return helpers.error('any.invalid');
        }

        const emptyString = password
          .replace(/[a-z]/gi, '')
          .replace(/[0-9]/g, '')
          .replace(new RegExp(SYMBOLS_REGEX, 'g'), '');
        if (emptyString) {
          return helpers.error('any.invalid');
        }

        return password;
      }, 'password validation')
    }),
  userWord: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      difficulty: Joi.string().max(50),
      optional: optionalScheme
    }),
  statistics: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      learnedWords: Joi.number()
        .integer()
        .min(0)
        .max(100000),
      optional: optionalScheme
    }),
  settings: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      wordsPerDay: Joi.number()
        .integer()
        .min(1)
        .max(1000),
      optional: optionalScheme
    })
};

function optionalValidator(value, helpers) {
  if (JSON.stringify(value).length > MAX_SYMBOLS_PER_OBJECT) {
    return helpers.error('object.length');
  }

  return value;
}

module.exports = schemas;
