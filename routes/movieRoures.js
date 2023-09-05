const router = require('express').Router();
const {
  postMovieValidator,
  deleteMovieValidator,
} = require('../utils/movieSchemaValidator');

const {
  deleteMovie,
  getAllMovies,
  postMovie,
} = require('../controllers/movieController');

router.get('/', getAllMovies);
router.post('/', postMovieValidator, postMovie);
router.delete('/:movieId', deleteMovieValidator, deleteMovie);

module.exports = router;
