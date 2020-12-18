const express = require('express');
const config = require('./config/index');
const MongoConnect = require('./DB/index');

new MongoConnect();

const app = express();

app.use('/', (req, res) => {
  res.send('Hello world');
});

app.listen(config.app.port, () => {
  console.log(`server running on http://localhost:${config.app.port}`);
});
