const User = require('./model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (userData) => {
  //get user pass
  const password = userData.password;

  return new Promise(async(resolve, reject) => {

    //encrypt user pass
    const hashedPass = await bcrypt.hashSync(password, 10, (error, hash) => {
      if(error) {
        return reject('[Controller ERROR]: ' + error)
      }
      return hash;
    });

    // overwrite pass for hashedpass
    userData.password = hashedPass

    //build user Schema
    let user = new User(userData)

    //save on DB
    user.save((error, newUser) => {
      return error?
      reject('[Controller ERROR: error on db save] ' + newUser)
      :resolve(newUser)
    })
  })
};


module.exports = {
  register,
};