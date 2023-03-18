module.exports = class CustomError extends Error {
  constructor(message, status, code, expect) {
    super();
    this.message = message;
    this.status = status;
    this.code = code;
    this.expect = expect;
  }
};
