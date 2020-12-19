const Vacants = require('./model');

// Vacant list
const getAll = () =>
  new Promise(async (resolve, reject) => {
    await Vacants.find({}, (error, vacants) =>
      error ? reject(`[Controller ERROR]: ${error}`) : resolve(vacants)
    );
});

const add = (vacantData) => {
  return new Promise((resolve, reject) => {

    //add default values
    vacantData.modality = 'remote';
    vacantData.userId = [];

    //create vacant schema
    let vacant = new Vacants(vacantData)
    
    //save on db
    vacant.save((error, newVacant) => {
      return error?
      reject('[Controller ERROR: error on db save] ' + error)
      :resolve(newVacant)
    })
  });
}

module.exports = {
  getAll,
  add,
};
