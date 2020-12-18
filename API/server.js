const express = require('express');
const router = require('./router/index');
const app = express();

//API Endpoints
router(app)

//static files
app.use('/', express.static('./API/public'));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("server running on port: " + listener.address().port);
});