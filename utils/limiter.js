const rateLimit = require('express-rate-limit');

const requestLimiter = rateLimit({
  // windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
});

module.exports = { requestLimiter, signupLimiter };
