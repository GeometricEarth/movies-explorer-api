const router = require('express').Router();

const {
  deleteMovie,
  getAllMovies,
  postMovie,
} = require('../controllers/movieController');

router.get('/', getAllMovies);
router.post('/', postMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
