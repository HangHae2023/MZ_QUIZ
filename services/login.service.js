require('dotenv').config();

const LoginRepository = require('../repositories/login.repository');
const { ValidationError } = require('../exceptions/index.exception');
const jwt = require('jsonwebtoken');
const { comparePassword } = require('../modules/cryptoUtils.js');

class LoginService {
  constructor() {
    this.loginRepository = new LoginRepository();
  }
  userLogin = async (userId, password, res) => {
    try {
      const user = await this.loginRepository.findByID(userId);

      if (!user) {
        throw new ValidationError('존재하지 않는 사용자입니다');
      }

      const comparePw = await comparePassword(password, user.password);

      if (!comparePw) {
        throw new ValidationError('패스워드를 확인해주세요.');
      }

      return user;

    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      } else {
        throw new Error('로그인에 실패하였습니다.');
      }
    }
  };

  generateToken = async (userId) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: '30m',
    });

    //return token;
    return token;
  };
}
module.exports = LoginService;
