require('dotenv').config();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { users } = require('../database/models');

const { JWT_SECRET } = process.env;

const loginService = {
  create: async ({ email, password }) => {
    const user = await users.findOne({ where: { email } });

    if (!email || !password) {
      return { message: 'Invalid fields', code: 400 };
    }
    if (!user) return { message: 'Not found', code: 404 };
    if (md5(password) !== user.password) {
      return { message: 'Not Found', code: 404 };
    }

    const jwtConfig = {
      algorithm: 'HS256',
    };

    const token = jwt.sign({
      data: { email, id: user.dataValues.id } },
      JWT_SECRET, jwtConfig);

    return { token };
  },
};

module.exports = loginService;
