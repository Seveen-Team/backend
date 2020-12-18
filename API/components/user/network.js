const express = require('express');
const router = express.Router();

const userController = require('./controller');
const response = require('../../utils/response');

//routes
router.post('/register', registerUser);
router.get('/user', list);

//routes handlers
async function registerUser (req, res, next) {
  const userData = req.body;

  await userController.register(userData)
  .then((user) => response.success(req, res, user, 200))
  .catch((error) => response.error(req, res, 'Internal Error', 500, error))
};

async function list (req, res, next) {
  await userController.list()
  .then((users) => response.success(req, res, users, 200))
  .catch((error) => response.error(req, res, 'Internal Error', 500, error))
};

module.exports = router;
