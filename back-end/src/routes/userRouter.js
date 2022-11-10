const { Router } = require('express');
const userController = require('../controllers/user');
const validateToken = require('../middlewares/tokenValidation');

const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.get('/', validateToken, userController.getAll);
userRouter.get('/:id', validateToken, userController.getById);

// rotas para o admin criar e apagar um usuário sendo validado com o token JWT
userRouter.post('/admin', validateToken, userController.create);
userRouter.delete('/admin/:id', validateToken, userController.deleteUser);

module.exports = userRouter;
