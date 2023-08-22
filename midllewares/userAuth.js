const jwt = require('jsonwebtoken');
const { AuthError } = require('../utils/httpErrors');
const { JWT_SECRET } = require('../utils/constants');

const userAuth = (req, _res, next) => {
  try {
    const payload = jwt.verify(req.cookies.jwt, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
  next();
};

module.exports = userAuth;
