const express = require('express');
const router = require('./router/index');
const app = express();

app.use('/API', function(req, res) {
  res.send("Hello world");
});

//API Endpoints
router(app)

//static files
app.use('/', express.static('./API/public'));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("server running on port: " + listener.address().port);
});