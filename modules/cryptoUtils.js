require('dotenv').config();

const bcrypt = require('bcrypt');

const createHashPassword = async (password) => {
  return bcrypt.hash(password, Number(process.env.SALT_ITERATIONS_CNT));
};


module.exports = { createHashPassword};
