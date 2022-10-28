const { userService } = require('../services/user');

export const userController = {
  create: async (req, res) => {
    const token = await userService.create(req.body);
    if (token.error) {
      // error.code e error.message são acessados através do userService, que por sua vez tem acesso a userValidation.js
      return res.status(token.error.code)
      .json({ message: token.error.message });
    }

    return res.status(201).json({ token });
  },

  getAll: async (_req, res) => {
    const users = await userService.getAll();
    return res.status(200).json(users);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const user = await userService.getById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  },
};

