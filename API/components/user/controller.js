const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./model');
const config = require('../../config/index');

// registro de usuarios
const register = (userData) => {
  // get user pass
  const { password } = userData;

  return new Promise(async (resolve, reject) => {

    // encrypt user pass
    const hashedPass = await bcrypt.hashSync(password, 10, (error, hash) => {
      if(error) {
        return reject('[Controller ERROR]: ' + error)
      }
      return hash;
    });

    // overwrite pass for hashedpass
    userData.password = hashedPass;

    // build user Schema
    const user = new User(userData);

    // save on DB
    user.save((error, newUser) => {
      return error?
      reject('[Controller ERROR: error on db save] ' + error)
      :resolve(newUser)
    });
  });
};

const login = (username, password) => {
  return new Promise(async(resolve, reject) => {
    // Get user by email or username
    await User.findOne({$or: [{email:username}, {username: username}]})
    .then((user) => {
      //if not exist, reject
      if(!user) {
        return reject('[Controller ERROR: ] ' + 'El usuario no existe')
      }

      //if yes compare password
      bcrypt.compare(password, user.password, (error, result) => {
        //if are diferent
        if(error || !result) {
          return reject('Contraseña incorrecta, ' + error)
        }

        // sign token and add an expire
        let token = jwt.sign({name: user.name}, config.auth.secret, {expiresIn: '1h'});
        return resolve({
          rol: 'student',
          token: token
        })
      })
    })
    .catch((error) => reject('[Controller ERROR: ] ' + error))
  })
}

//listar usuarios
const list = () => {
  return new Promise(async(resolve, reject) => {
    await User.find({}), (error, users) => {
      return error?
      reject('[Controller ERROR]: ' + error)
      :resolve(users)
    });
  });
}

const updateUser = (id, newData) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: id }, newData, { new: true }, (error, updatedUser) => {
      console.log(updatedUser)
      return error?
      reject('[Error on controller]: ' + error)
      :!updatedUser?
      //if no id found
      reject('Non-vacant found ' + error)
      :resolve(updatedUser)
    })
  })
};

module.exports = {
  register,
  login,
  list,
  updateUser
};
