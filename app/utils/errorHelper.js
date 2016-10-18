'use strict';

module.exports.serverError = (err) => {
  const error = new Error('SERVER_ERROR');
  error.code = 500;
  return error;
};

module.exports.notFound = (err) => {
  const error = new Error('NOT_FOUND');
  error.code = 404;
  return error;
};

module.exports.badRequest = (err) => {
  const error = new Error('BAD_REQUEST');
  error.code = 400;
  return error;
};
