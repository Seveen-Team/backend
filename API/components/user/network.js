const express = require('express');

const router = express.Router();
const checkUserExistence = require('../../middleware/checkUserExistance');
const authenticate = require('../../middleware/authtenticate');
const userController = require('./controller');
const response = require('../../utils/response');

// routes
router.patch('/user/:id' /* , authenticate */, update);
router.post('/register', checkUserExistence, registerUser);
router.post('/login', userLogin);
router.get('/user' /* , authenticate */, list);
router.get('/user/:id' /* , authenticate */, getOne);

// routes handlers
async function registerUser(req, res, next) {
  const userData = req.body;

  await userController.register(userData)
    .then((user) => response.success(req, res, user, 200))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
}

async function userLogin(req, res, next) {
  const { username } = req.body;
  const { password } = req.body;

  await userController.login(username, password)
    .then((data) => response.success(req, res, data, 200))
    .catch((error) => response.error(req, res, 'Bad Request', 403, error));
}

async function list(req, res, next) {
  await userController.list()
    .then((users) => response.success(req, res, users, 200))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
}

async function getOne(req, res, next) {
  const { id } = req.params;

  await userController.getOneUser(id)
    .then((user) => response.success(req, res, user, 200))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
}

async function update(req, res, next) {
  const { id } = req.params;
  const newData = req.body;

  await userController.updateUserVacants(id, newData)
    .then((updatedUser) => response.success(req, res, updatedUser, 200))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
}

module.exports = router;
