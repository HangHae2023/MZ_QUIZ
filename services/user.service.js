require('dotenv').config();

const UserRepository = require('../repositories/user.repository');
const jwt = require('jsonwebtoken');
const { ValidationError } = require('../exceptions/index.exception');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  createLogin = async (userId, password) => {
    const user = await this.userRepository.findByUserIdAndPassword(
      userId,
      password
    );

    return user;
  };

  generateToken(userId) {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: '2h',
    });

    return token;
  }
  createSignup = async (userId, nickname, password) => {
    const existingUser = await this.userRepository.findByUserId(userId);
    if (existingUser.length) {
      throw new ValidationError('닉네임이 이미 사용중입니다.');
    }

    const user = await this.userRepository.createUser(
      userId,
      nickname,
      password
    );

    return user;
  };
}

module.exports = UserService;
