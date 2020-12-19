const jwt = require('jsonwebtoken');
const response = require('../utils/response');
const config = require('../config/index');

const authenticate = (req, res, next) => {
  try {
    //get token on request
    const token = req.headers.authorization.split(' ')[1];
    //verify that is correctly sign
    const decode = jwt.verify(token, config.auth.secret);
    
    //modify req.user
    req.user = decode;
    next();
  }
  catch(error) {
    response.error(req, res, 'Error on auth', 400, error)
  }
}

module.exports = authenticate;