// This middleware help us to check if an user already exists on DB

const User = require('../components/user/model');
const response = require('../utils/response');

const checkUserExistence = (req, res, next) => {
  try {
    //search by email
    User.exists({email: req.body.email}, (error, data) => {
      if(error) {
        console.log("hola")
        return reject("[Middleware ERROR]: " + error);
      }
      if(data) {
        return response.error(req, res, 'Usuario existente', 400, error);
      };
      // if no exist, continue.
      next();
    })
  }
  catch (error) {
    console.error("[Middleware ERROR]: " + error)
  }
};

module.exports = checkUserExistence;