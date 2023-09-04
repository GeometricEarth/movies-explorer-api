require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const celebrate = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const errorHandler = require('./midllewares/errorHandler');
const mainRouter = require('./routes');
const { requestLogger, errorLogger } = require('./midllewares/logger');
const { requestLimiter } = require('./utils/limiter');

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

app.use('/', mainRouter);

app.use(errorLogger);
app.use(celebrate.errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

process.on('uncaughtException', (err) => {
  console.error(err);
});
