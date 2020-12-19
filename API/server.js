const express = require('express');
const cors = require('cors');
const compression = require('cors');
const helmet = require('helmet');
const router = require('./router/index');
const config = require('./config/index');
const MongoConnect = require('./DB/index');

// app
const app = express();

// DB
new MongoConnect();

// global middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// API Endpoints
router(app);

// static files
app.use('/', express.static('./API/public'));

app.listen(config.app.port, () => {
  console.log(`server running on http://localhost:${config.app.port}`);
});
