const mainRouter = require('express').Router();
const {
  createUser,
  signIn,
  signOut,
} = require('../controllers/userController');
const userRourtes = require('./userRoutes');
const movieRoutes = require('./movieRoures');
const userAuth = require('../midllewares/userAuth');

const { signupLimiter } = require('../utils/limiter');
const { NotFound } = require('../utils/httpErrors');

mainRouter.post('/signup', signupLimiter, createUser);
mainRouter.post('/signin', signIn);
mainRouter.delete('/signout', userAuth, signOut);

mainRouter.use('/users', userAuth, userRourtes);
mainRouter.use('/movies', userAuth, movieRoutes);

mainRouter.use((_req, _res, next) => {
  next(new NotFound('Страница которую вы запрашиваете не существует'));
});

module.exports = mainRouter;
