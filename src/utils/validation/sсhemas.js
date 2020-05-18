const Joi = require('@hapi/joi');
const UUID_VERSION = 'uuidv4';

const schemas = {
  id: {
    id: Joi.string()
      .guid({ version: UUID_VERSION })
      .required()
  },
  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      email: Joi.string().email({ tlds: { allow: false } }),
      password: Joi.string().custom((value, helpers) => {
        const password = value.trim();

        if (password.length < 8) {
          return helpers.error('any.invalid');
        }

        if (!/[+-_@$!%*?&#.,;:[\]{}]/.test(password)) {
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
          .replace(/[+-_@$!%*?&#.,;:[\]{}]/g, '');
        if (emptyString) {
          return helpers.error('any.invalid');
        }

        return password;
      }, 'password validation')
    })
};

module.exports = schemas;
