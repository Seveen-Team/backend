const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./model');
const Vacant = require('../vacant/model')
const config = require('../../config/index');
const { find, update } = require('./model');

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
      bcrypt.compare(password, user.password, async(error, result) => {
        //if are diferent
        if(error || !result) {
          return reject('Contraseña incorrecta, ' + error)
        }
        // sign token and add an expire
        let token = jwt.sign({name: user.name}, config.auth.secret, {expiresIn: '1h'});

        //get vacants in its own array
        const interested = await Vacant.find({"_id":{"$in": user["myVacants"]["interested"]}})
        const process = await Vacant.find({"_id":{"$in": user["myVacants"]["process"]}})
        const completed = await Vacant.find({"_id":{"$in": user["myVacants"]["completed"]}})

        //add to user body response
        user["myVacants"]["interested"] = interested
        user["myVacants"]["proces"] = process
        user["myVacants"]["completed"] = completed

        //answer frontend
        return resolve({
          rol: 'student',
          token: token,
          user
        })
      }) 
    })
    .catch((error) => reject('[Controller ERROR: ] ' + error))
  })
}

//listar usuarios
const list = () => {
  return new Promise(async(resolve, reject) => {
    await User.find({}, (error, users) => {
      return error?
      reject('[Controller ERROR]: ' + error)
      :resolve(users)
    });
  });
}

const getOneUser = (userId) => {
  return new Promise(async(resolve, reject) => {
    const userInfo = await User.findOne({_id: userId})
    const interested = await Vacant.find({"_id":{"$in": userInfo["myVacants"]["interested"]}})

    userInfo["myVacants"]["interested"] = interested

    resolve(userInfo)
  });
}

function arrayRemove(arr, value) {
  return arr.filter((element) => {
    return element != value;
  });
}

const updateUserVacants = (userId, newData) => {
  return new Promise( async(resolve, reject) => {
    // hallar user data
    await User.findOne({_id: userId})
    .then( async(data) => {

      let dbArray = data.myVacants;
      let reqValue = newData.myVacants;
      let value;
      let result = {};
      let myArray;
      let index; 

      if(reqValue.interested) {
        myArray = dbArray.interested
        value = reqValue.interested
        index = "interested"
      }
      if(reqValue.process) {
        myArray = dbArray.process
        value = reqValue.process
        index = "process"
      }
      if(reqValue.completed) {
        myArray = dbArray.completed
        value = reqValue.completed
        index = "completed"
      }

      // compare if vacant is currently in array
      const idFound = myArray.find((element) => element == value)

      //if yes, remove that vacant
      if(idFound) {
        const updatedData = arrayRemove(myArray, value)
        console.log(updatedData)
        result = {
          myVacants: {
            [index]: updatedData,
          },
        }

        return await User.findOneAndUpdate({ _id: userId }, result, { new: true, upsert: true }, (error, updatedUser) => {
          // console.log(updatedUser)
          return error?
          reject('[Error on controller]: ' + error)
          :!updatedUser?
          //if no userId found
          reject('Non-vacant found ' + error)
          :resolve(updatedUser)
        })
      }

      // if not, add it
      else {
        myArray.push(value)
        console.log(myArray)
        result = {
          myVacants: {
            [index]: myArray,
          },
        }

        await User.findOneAndUpdate({ _id: userId }, result, { new: true, upsert: true }, (error, updatedUser) => {
          // console.log(updatedUser)
          return error?
          reject('[Error on controller]: ' + error)
          :!updatedUser?
          //if no userId found
          reject('Non-vacant found ' + error)
          :resolve(updatedUser)
        })
      }
    })
  })
};

module.exports = {
  register,
  login,
  list,
  updateUserVacants,
  getOneUser
};
