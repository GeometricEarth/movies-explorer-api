const { Joi, celebrate } = require('celebrate');
const { urlRegExp } = require('./constants');

function postMovieValidator() {
  return celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(urlRegExp),
      trailerLink: Joi.string().required().pattern(urlRegExp),
      thumbnail: Joi.string().required().pattern(urlRegExp),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  });
}

function deleteMovieValidator() {
  return celebrate({
    props: Joi.object().keys({
      movieId: Joi.string().hex().length(24).required(),
    }),
  });
}

module.exports = { postMovieValidator, deleteMovieValidator };
