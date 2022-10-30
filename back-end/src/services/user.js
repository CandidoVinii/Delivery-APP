const fs = require('fs');
const md5 = require('md5');
const { sign } = require('jsonwebtoken');
const { users } = require('../database/models');
const validations = require('../middlewares/userValidation');

const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const userService = {
  create: async (data) => {
    const validate = await validations(data);
    if (validate.error) {
      return validate;
    }
    const passwordHash = md5(data.password);

    await users.create({ ...data, password: passwordHash });
    const userData = { email: data.email, nome: data.name };
    const jwtConfig = {
      algorithm: 'HS256',
    };

    const token = sign(userData, JWT_SECRET, jwtConfig);

    return token;
  },

  getAll: async () => {
    const listUsers = await users.findAll({
      attributes: { exclude: 'password' },
    });
    return listUsers;
  },

  getById: async (id) => {
    const user = await users.findOne({
      where: { id },
      attributes: { exclude: 'password' },
    });
    return user;

    // Outra forma de desenvolver usando o findByPk
    // const user = await User.findByPk(id, { attributes: { exclude: 'password' } });
  },
};

module.exports = userService;
