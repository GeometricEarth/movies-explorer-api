const { Joi, celebrate } = require('celebrate');

// eslint-disable-next-line arrow-body-style
const updateUserValidator = () => {
  return celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  });
};

module.exports = updateUserValidator;
