const { Users } = require('../models');
const { Op } = require('sequelize');

class UserRepository extends Users {
  constructor() {
    super();
  }

  async findByUserIdAndPassword(userId, password) {
    const user = await Users.findOne({
      where: {
        [Op.and]: [{ userId }, { password }],
      },
    });

    return user;
  }
  findByUserId = async (userId) => {
    const user = await Users.findAll({
      where: { userId },
    });
    return user;
  };

  createUser = async (userId, nickname, password) => {
    const user = await Users.create({ userId, nickname, password });
    return user;
  };
}

module.exports = UserRepository;
