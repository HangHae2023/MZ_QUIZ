const { Users } = require('../models');
const { Op } = require('sequelize');

class LoginRepository extends Users {
  constructor() {
    super();
  }

  async findByID(userId) {
    const user = await Users.findOne({
      where: {
        userId,
      },
    });

    return user;
  }
}

module.exports = LoginRepository;
