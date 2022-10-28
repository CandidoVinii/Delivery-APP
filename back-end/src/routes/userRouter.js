const { Router } = require('express');
const userController = require('../controllers/user');
const validateToken = require('../middlewares/tokenValidation');

const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.get('/', validateToken, userController.getAll);
userRouter.get('/:id', validateToken, userController.getById);

module.exports = userRouter;
