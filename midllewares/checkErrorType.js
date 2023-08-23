const mongoose = require('mongoose');
const { BadRequest, DuplicateKeyError } = require('../utils/httpErrors');

module.exports = (err) => {
  if (
    // eslint-disable-next-line operator-linebreak
    err instanceof mongoose.Error.ValidationError ||
    err instanceof mongoose.Error.CastError
  ) {
    return new BadRequest('Переданы некорректные данные');
  }
  if (err.code === 11000) {
    return new DuplicateKeyError('Пользователь с таким email уже существует');
  }

  return err;
};
