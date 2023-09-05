const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/userController');
const updateUserValidator = require('../utils/userSchemaValidatior');

router.get('/me', getUser);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
