const mongoose = require('mongoose');
const config = require('../config/index');

const MONGODB_URI = `mongodb+srv://${config.database.dbUser}:${config.database.dbPassword}${config.database.dbHost}/${config.database.dbName}?retryWrites=true&w=majority`;

module.exports = class MongoConnect {
  constructor() {
    this.connect();
  }

  async connect() {
    await mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
      .then(() => console.log('Data base is connect!!'))
      .catch((err) => console.log(err));
  }
};
