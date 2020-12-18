const express = require('express');
const router = express.Router();
const userController = require('./controller');
const response = require('../../utils/response');

router.post('/register', registerUser);

async function registerUser (req, res, next) {
  const userData = req.body;

  await userController.register(userData)
  .then((user) => response.success(req, res, user, 200))
  .catch((error) => response.error(req, res, 'Internal Error', 500, error))
};

module.exports = router;