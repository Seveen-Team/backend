const express = require('express');
const router = require('./router/index');
const app = express();
const config = require('./config/index');

//API Endpoints
router(app)

//static files
app.use('/', express.static('./API/public'));

app.listen(config.app.port, () => {
  console.log(`server running on http://localhost:${config.app.port}`);
})
