const Vacants = require('./model');

// Vacant list
const list = () =>
  new Promise(async (resolve, reject) => {
    await Vacants.find({}, (error, vacants) =>
      error ? reject(`[Controller ERROR]: ${error}`) : resolve(vacants)
    );
  });

module.exports = {
  list,
};
