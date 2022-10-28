const { Router } = require('express');
const { loginController } = require('../controllers/login');
const { loginValidation } = require('../middlewares/loginValidation');

export const loginRouter = Router();

loginRouter.post('/', loginValidation, loginController.create);
