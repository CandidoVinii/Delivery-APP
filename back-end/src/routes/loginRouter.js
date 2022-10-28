const { Router } = require('express');
const loginController = require('../controllers/login');
const validateLogin = require('../middlewares/loginValidation');

const loginRouter = Router();

loginRouter.post('/', validateLogin, loginController.create);

module.exports = loginRouter;
