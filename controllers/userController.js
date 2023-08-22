const bcrypt = require('bcrypt');
const User = require('../models/user');
const { NotFound, DuplicateKeyError } = require('../utils/httpErrors');
const checkErrorType = require('../midllewares/checkErrorType');

const notFoundErrorMessage = 'Запрашиваемый пользователь не найден';

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound({ message: notFoundErrorMessage });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      next(checkErrorType(err));
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { ...req.body } },
    { new: true, runValidators: true },
  )
    .then((result) => {
      if (!result) {
        throw new NotFound(notFoundErrorMessage);
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      next(checkErrorType(err));
    });
};

const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({ ...req.body, password: hash });
    return res.status(201).send(user);
  } catch (err) {
    if (err.code === 11000) {
      return next(
        new DuplicateKeyError('Пользователь с таким email уже существует'),
      );
    }
    return next(checkErrorType(err));
  }
};

module.exports = { getUser, updateUser, createUser };
