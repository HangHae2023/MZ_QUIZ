require('dotenv').config();

const LoginRepository = require('../repositories/login.repository');
const { ValidationError } = require('../exceptions/index.exception');
const jwt = require('jsonwebtoken');

class LoginService {
  constructor() {
    this.loginRepository = new LoginRepository();
  }
  userLogin = async (userId, password) => {
    //try{
    const user = await this.loginRepository.findByIDPW(userId, password);
    if (!user) {
      throw new ValidationError('아이디 또는 패스워드를 확인해주세요.');
    }

    return user;
  };

  generateToken = async (userId) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: '30m',
    });

    return token;
  };
}

module.exports = LoginService;
