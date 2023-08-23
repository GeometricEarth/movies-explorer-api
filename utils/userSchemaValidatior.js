const { Joi, celebrate } = require('celebrate');

// eslint-disable-next-line arrow-body-style
const updateUserValidator = (req, res, next) => {
  const test = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  });
  test(req, res, next);
};

module.exports = updateUserValidator;
