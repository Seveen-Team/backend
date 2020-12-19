const express = require('express');
const vacantController = require('./controller');
const response = require('../../utils/response');

const router = express.Router();

router.get('/', list);
router.post('/', create)
router.patch('/:id', update)

async function list (req, res, next) {
  await vacantController
    .getAll()
    .then((vacants) => response.success(req, res, vacants, 200))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
};

async function create (req, res, next) {
  await vacantController.add(req.body)
  .then((vacant) => response.success(req, res, vacant, 201))
  .catch((error) => response.error(req, res, 'Internal Error', 500, error));
}

async function update (req, res, next) {
  await vacantController.updateVacant(req.params.id, req.body)
  .then((updatedVacant) => response.success(req, res, updatedVacant, 200))
  .catch((error) => response.error(req, res, 'Internal Error', 500, error));
}

module.exports = router;
