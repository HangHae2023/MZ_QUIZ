const { Users } = require('../models');

class SignupRepository extends Users {
  constructor() {
    super();
  }

  findByID = async (userId) => {
    const user = await Users.findAll({
      where: { userId },
    });
    return user;
  };

  findBynickname = async (nickname) => {
    const user = await Users.findAll({
      where: { nickname },
    });
    return user;
  };

  userSignup = async (userId, nickname, password) => {
    const user = await Users.create({ userId, nickname, password });
    return user;
  };

  isIDDuple = async (userId) => {
    const user = await Users.findAll({
      where: { userId },
    });
    return user;
  };

  isNicknameDuple = async (nickname) => {
    const user = await Users.findAll({
      where: { nickname },
    });
    return user;
  };
}

module.exports = SignupRepository;
