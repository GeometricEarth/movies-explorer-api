const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { NotFound, AuthError } = require('../utils/httpErrors');
const { JWT_SECRET } = require('../utils/constants');
const checkErrorType = require('../midllewares/checkErrorType');

const notFoundErrorMessage = 'Запрашиваемый пользователь не найден';
const AuthErrorMessage = 'Неправильное имя пользователя или пароль';

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
    return next(checkErrorType(err));
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthError(AuthErrorMessage);
    }
    const isAuthorized = bcrypt.compare(user.password, password);
    if (!isAuthorized) {
      throw new AuthError(AuthErrorMessage);
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res
      .status(200)
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'None',
        secure: true,
      })
      .end();
  } catch (err) {
    next(checkErrorType(err));
  }
};

module.exports = {
  getUser,
  updateUser,
  createUser,
  signIn,
};
