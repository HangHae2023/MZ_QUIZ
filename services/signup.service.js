const Joi = require('joi');
const SignupRepository = require('../repositories/signup.repository');
const { ValidationError } = require('../exceptions/index.exception');
const {
  createHashPassword,
  comparePassword,
} = require('../modules/cryptoUtils.js');

class SignupService {
  constructor() {
    this.signupRepository = new SignupRepository();
  }

  isIDDuple = async (userId) => {
    const existingUser = await this.signupRepository.isIDDuple(
      userId.toLowerCase()
    );
    if (existingUser.length) {
      throw Boom.badData('중복된 아이디 입니다', false);
    }
    return existingUser;
  };

  isNicknameDuple = async (nickname) => {
    const existingUser = await this.signupRepository.isNicknameDuple(
      nickname.toLowerCase()
    );
    if (existingUser.length) {
      throw Boom.badData('중복된 닉네임 입니다', false);
    }
    return existingUser;
  };

  userSignup = async (userId, password, nickname) => {
    try {
      const existingUser = await this.signupRepository.findByID(
        userId.toLowerCase()
      );

      if (existingUser.length) {
        throw Boom.badData('중복된 아이디 입니다', false);
      }

      const existingUser2 = await this.signupRepository.findBynickname(
        nickname.toLowerCase()
      );
      if (existingUser2.length) {
        throw Boom.badData('중복된 닉네임 입니다', false);
      }

      const hashedPassword = await createHashPassword(password);

      const user = await this.signupRepository.userSignup(
        userId,
        hashedPassword,
        nickname
      );

      return user;
    } catch (error) {
      if (error instanceof Boom) {
        throw error;
      } else {
        throw new Error('요청한 데이터 형식이 올바르지 않습니다.');
      }
    }
  };
}
module.exports = SignupService;
