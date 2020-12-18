const express = require('express');

const app = express()

app.use('/', function(req, res) {
  res.send("Hello world")
})

app.listen(3000, function() {
  console.log("server running on " + 3000)  
})