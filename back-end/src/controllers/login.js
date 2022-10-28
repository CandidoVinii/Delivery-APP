const { loginService } = require("../services/login");

export const loginController = {
  create: async (req, res, next) => {
    const token = await loginService.create(req.body);

    if (token.message) return next(token);

    return res.status(200).json(token);
  },
};
