const express = require('express');
const config = require('./config/index');

const app = express()

app.use('/', function(req, res) {
  res.send("Hello world")
})

app.listen(config.app.port, () => {
  console.log(`server running on http://localhost:${config.app.port}`);
})