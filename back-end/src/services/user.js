import { sign } from "jsonwebtoken";
import { User } from "../database/models";
import validations from "../middlewares/userValidation";

const { JWT_SECRET } = process.env;

export const userService = {
  create: async (data) => {
    const validate = await validations(data);
    if (validate.error) {
      return validate;
    }

    const user = await User.create(data);

    const userData = { email: data.email, id: user.id };
    const jwtConfig = {
      algorithm: "HS256",
    };

    const token = sign(userData, JWT_SECRET, jwtConfig);

    return token;
  },

  getAll: async () => {
    const listUsers = await User.findAll({
      attributes: { exclude: "password" },
    });
    return listUsers;
  },

  getById: async (id) => {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: "password" },
    });
    return user;

    // Outra forma de desenvolver usando o findByPk
    // const user = await User.findByPk(id, { attributes: { exclude: 'password' } });
  },
};

