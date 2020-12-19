const express = require('express');
const vacantController = require('./controller');
const response = require('../../utils/response');

const router = express.Router();

list = async (req, res, next) => {
  await vacantController
    .list()
    .then((vacants) => response.success(req, res, vacants, 200))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
};

router.get('/vacant', list);

module.exports = router;
