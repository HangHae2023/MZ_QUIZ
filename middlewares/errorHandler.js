// const errorLogger = (error, request, response, next) => {
//   console.error(error);
//   next(error); // errorLogger -> errorHandler
// };

// const errorHandler = (error, req, res, next) => {
//   const status = error.status || 400;
//   res.status(status);
//   res.json({ errorMessage: error.message });
// };

// module.exports = { errorLogger, errorHandler };

module.exports = class CustomError extends Error {
  constructor(message, status, code, expect, ) {
    super();
    this.message = message;
    this.status = status;
    this.code = code;
    this.expect = expect;

  }

  toString() {
    return `${this.message} (${this.status}) (${this.code})`;
  }
};