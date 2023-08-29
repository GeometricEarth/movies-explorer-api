const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const celebrate = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const errorHandler = require('./midllewares/errorHandler');
const { requestLogger, errorLogger } = require('./midllewares/logger');
const { requestLimiter, signupLimiter } = require('./utils/limiter');
const { NotFound } = require('./utils/httpErrors');
const userAuth = require('./midllewares/userAuth');
const { createUser, signIn, signOut } = require('./controllers/userController');
const { userRourtes, movieRoutes } = require('./routes');

const { PORT, DB_URI, FRONT_URL } = require('./utils/constants');

const app = express();
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
    autoIndex: true,
  })
  .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: FRONT_URL, credentials: true }));
app.use(helmet());
app.use(requestLogger);
app.use(requestLimiter);

app.post('/signup', signupLimiter, createUser);
app.post('/signin', signIn);
app.delete('/signout', signOut);

app.use('/users', userAuth, userRourtes);
app.use('/movies', userAuth, movieRoutes);
app.use((_req, _res, next) => {
  next(new NotFound('Страница которую вы запрашиваете не существует'));
});

app.use(errorLogger);
app.use(celebrate.errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

process.on('uncaughtException', (err) => {
  console.error(err);
});
