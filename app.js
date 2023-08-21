const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./midllewares/errorHandler');

const PORT = 3001;
const app = express();
mongoose
  .connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
    autoIndex: true,
  })
  .catch(console.log);

app.use(errorHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

process.on('uncaughtException', (err) => {
  console.error(err);
});
