const express = require('express');
const mongoose = require('mongoose');

const PORT = 3001;
const app = express();
mongoose
  .connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
    autoIndex: true,
  })
  .catch(console.log);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
