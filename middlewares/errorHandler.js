module.exports = class CustomError extends Error {
  constructor(message, status, expect) {
    super();
    this.message = message;
    this.status = status;
    this.expect = expect;
  }
};
