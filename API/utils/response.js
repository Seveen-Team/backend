// This module help us to handle the responses we give to client and the logs that help us to debbug the code.
// This way we give error and responses with more consitency

const statusMessage = {
  200: 'Valid Request',
  201: 'Created',
  400: 'Invalid Format',
  500: 'Internal Error',
};

// handle success request
exports.success = (req, res, data, status) => {
  let statusCode = status;
  let result = data;

  if (!status) {
    statusCode = 200;
  }

  if (!data) {
    result = statusMessage[statusCode];
  }

  res.status(statusCode).send({
    error: '',
    body: result,
  });
};

// handle success request
exports.error = (req, res, data, status, details) => {
  console.error(`[Response Error]: ${details}`);
  let statusCode = status;
  let result = data;

  if (!status) {
    statusCode = 500;
  }

  if (!data) {
    result = statusMessage[statusCode];
  }

  res.status(statusCode).send({
    error: result,
    details,
    body: '',
  });
};
