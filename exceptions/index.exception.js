class InvalidParamsError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 400;
    this.name = 'InvalidParamsError';
    this.message = message || '요청한 데이터 형식이 올바르지 않습니다'
    if (message) this.message = {
      
      success : false,
      errorcode : this.status,
      errorMessage : this.message
    }
  }
}

class ValidationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 412;
    this.name = 'ValidationError';
    this.message = message || '요청한 데이터 형식이 올바르지 않습니다'
    if (message) this.message = {

      success : false,
      errorcode : this.status,
      errorMessage : this.message



    }
  }
}

module.exports = { InvalidParamsError, ValidationError };
