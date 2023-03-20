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
      throw new ValidationError('중복된 아이디입니다.');
    }
    return { success: true, message: '사용가능한 아이디입니다' };
  };

  isNicknameDuple = async (nickname) => {
    const existingUser = await this.signupRepository.isNicknameDuple(
      nickname.toLowerCase()
    );
    if (existingUser.length) {
      throw new ValidationError('중복된 닉네임입니다.');
    }
    return { success: true, message: '사용가능한 닉네임입니다' };
  };

  userSignup = async (userId, password, nickname) => {
    try {
      const existingUser = await this.signupRepository.findByID(
        userId.toLowerCase()
      );

      if (existingUser.length) {
        throw new ValidationError('중복된 아이디입니다.');
      }

      const existingUser2 = await this.signupRepository.findBynickname(
        nickname.toLowerCase()
      );
      if (existingUser2.length) {
        throw new ValidationError('중복된 닉네임 입니다.');
      }

      const hashedPassword = await createHashPassword(password);

      const user = await this.signupRepository.userSignup(
        userId,
        hashedPassword,
        nickname
      );

      return { success: true, message: '회원가입에 성공했습니다' };
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      } else {
        throw new Error('요청한 데이터 형식이 올바르지 않습니다.');
      }
    }
  };
}
module.exports = SignupService;
