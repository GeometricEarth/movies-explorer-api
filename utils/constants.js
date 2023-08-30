// eslint-disable-next-line operator-linebreak
const urlRegExp =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]+\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const {
  JWT_SECRET = 'dev-secret',
  PORT = 3000,
  DB_URI = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

module.exports = {
  urlRegExp,
  JWT_SECRET,
  PORT,
  DB_URI,
};
