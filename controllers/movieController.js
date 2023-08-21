const Movie = require('../models/movie');
const checkErrorType = require('../midllewares/checkErrorType');
const { NotFound, Forbidden } = require('../utils/httpErrors');

const getAllMovies = (_req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((err) => {
      next(checkErrorType(err));
    });
};

const postMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      next(checkErrorType(err));
    });
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      throw new NotFound({ message: 'Данный id отстуствует в базе' });
    }
    if (req.user._id !== movie.owner.toString()) {
      throw new Forbidden({ message: 'Доступ запрещен' });
    }
    await Movie.deleteOne({ _id: movie._id }).then();
    res.status(200).send({ message: 'Фильм удален' });
  } catch (err) {
    next(checkErrorType(err));
  }
};

module.exports = {
  getAllMovies,
  postMovie,
  deleteMovie,
};
