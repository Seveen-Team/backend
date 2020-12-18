const user = require('../components/user/network');
// const vacant = require('../components/vacant/network');

const router = function (server) {
  const PATH = '/api/v1';
  server.use(PATH, user);
  // server.use(PATH + '/vacant', vacant);
};

module.exports = router;