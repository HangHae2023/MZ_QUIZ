const LoginRepository = require('../repositories/login.repository');
const { ValidationError } = require('../exceptions/index.exception');
const jwt = require('jsonwebtoken');

class LoginService {
  constructor() {
    this.loginRepository = new LoginRepository();
  }
  logout = async (userId) => {
    try {
      await this.authRepository.deleteRefreshToken(userId); // assuming the refresh token is stored in a database
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

module.exports = LoginService;
