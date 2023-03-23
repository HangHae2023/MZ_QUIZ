const { Users } = require('../models');
const { Op } = require('sequelize');

class LogoutRepository extends Users {
  constructor() {
    super();
  }
  deleteRefreshToken = async (userId) => {
    const query = {
      text: 'DELETE FROM refresh_tokens WHERE user_id = $1',
      values: [userId],
    };
    try {
      await Users.query(query);
    } catch (err) {
      throw new Error(err.message);
    }
  };
}
