const { Joi, celebrate } = require('celebrate');
const { urlRegExp } = require('./constants');

function postMovieValidator(req, res, next) {
  const test = celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(urlRegExp),
      trailerLink: Joi.string().required().pattern(urlRegExp),
      thumbnail: Joi.string().required().pattern(urlRegExp),
      beatFilmId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  });
  test(req, res, next);
}

function deleteMovieValidator(req, res, next) {
  const test = celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex().length(24).required(),
    }),
  });
  test(req, res, next);
}

module.exports = { postMovieValidator, deleteMovieValidator };
