const { Users } = require('../models');
const { Op } = require('sequelize');

class LoginRepository extends Users {
  constructor() {
    super();
  }

  async findByIDPW(userId, password) {
    const user = await Users.findOne({
      where: {
        [Op.and]: [{ userId }, { password }],
      },
    });

    return user;
  }
}

module.exports = LoginRepository;
