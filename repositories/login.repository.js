const { Users } = require('../models');
const { Op } = require('sequelize');

class LoginRepository extends Users{
  constructor() {
    super();
  }
  
  async findByIDPW(userId, password) {
    console.log('----------------', userId, password)
    const user = await Users.findOne({
      where: {
        [Op.and]: [{ userId }, { password }],
      },
    });

    console.log('--------뭐지--------', user)

    return user;
  }
}

module.exports = LoginRepository;