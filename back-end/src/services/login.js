require('dotenv/config').config();
const jwt = require('jsonwebtoken');
const md5 = require('md5')
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

export const loginService = {
  create: async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });

    if (md5(password) !== user.password) {
      return { message: 'Not Found', code: 400 };
    }
    if (!user) return { message: 'User Not Found', code: 404 };
    if (!user || user.password !== password) {
      return { message: 'Invalid fields', code: 400 };
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
