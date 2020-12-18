const express = require('express');
const router = express.Router();

router.get('/register', registerUser);

function registerUser (req, res, next) {
  res.send('hello World');
};

module.exports = router;