require('dotenv').config();

const LoginRepository = require('../repositories/login.repository');
const { ValidationError } = require('../exceptions/index.exception');
const jwt = require('jsonwebtoken');
const { comparePassword } = require('../modules/cryptoUtils.js');
const Boom = require('boom');

class LoginService {
  constructor() {
    this.loginRepository = new LoginRepository();
  }
  userLogin = async (userId, password, res) => {
    try {
      const user = await this.loginRepository.findByID(userId);

      if (!user) {
        throw Boom.notFound('존재하지 않는 사용자입니다', false);
      }

      const comparePw = await comparePassword(password, user.password);

      if (!comparePw) {
        throw Boom.unauthorized('패스워드를 확인해주세요.', false);
      }
      
      return user;
    } catch (error) {
      if (error instanceof Boom) {
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

    return token;
  };
}
module.exports = LoginService;
