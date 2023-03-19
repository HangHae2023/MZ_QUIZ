const SignupRepository = require('../repositories/signup.repository');
const { ValidationError } = require('../exceptions/index.exception');
const {
  createHashPassword,
  comparePassword,
} = require('../modules/cryptoUtils.js');

const Joi = require('joi');

const re_nickname = /^[a-zA-Z0-9]{3,10}$/;
const re_password = /^[a-zA-Z0-9]{4,30}$/;

const userSchema = Joi.object({
  nickname: Joi.string().pattern(re_nickname).required(),
  password: Joi.string().pattern(re_password).required(),
  confirm: Joi.string(),
});

class SignupService {
  constructor() {
    this.signupRepository = new SignupRepository();
  }

  isIDDuple = async (userId) => {
    await userSchema.validate({ userId });

    const existingUser = await this.signupRepository.isIDDuple(userId);
    if (existingUser.length) {
      throw new ValidationError('중복된 아이디입니다.');
    }
    return res
      .status(200)
      .send({ userId, success: true, message: '사용가능한 아이디입니다' });
  };

  isNicknameDuple = async (nickname) => {
    await userSchema.validate({ nickname });

    const existingUser = await this.signupRepository.isNicknameDuple(nickname);
    if (existingUser.length) {
      throw new ValidationError('중복된 닉네임입니다.');
    }
    return res
      .status(200)
      .send({ nickname, success: true, message: '사용가능한 닉네임입니다' });
  };

  userSignup = async (userId, password, nickname) => {
    try {
      await userSchema.validate({ userId, password, nickname });

      const hashedPassword = await createHashPassword(password);

      const user = await this.signupRepository.userSignup(
        userId,
        hashedPassword,
        nickname
      );

      return { success: true, message: '회원가입에 성공했습니다' };
    } catch (err) {
      throw new ValidationError('예상못한 에러');
    }
  };
}

module.exports = SignupService;
