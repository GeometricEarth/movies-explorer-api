const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const errorHandler = require('./midllewares/errorHandler');
const userAuth = require('./midllewares/userAuth');
const { createUser, signIn } = require('./controllers/userController');
const { userRourtes, movieRoutes } = require('./routes');

const { PORT } = require('./utils/constants');

const app = express();
mongoose
  .connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
    autoIndex: true,
  })
  .catch(console.log);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signup', createUser);
app.post('/signin', signIn);

app.use('/users', userAuth, userRourtes);
app.use('/movies', userAuth, movieRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

process.on('uncaughtException', (err) => {
  console.error(err);
});
