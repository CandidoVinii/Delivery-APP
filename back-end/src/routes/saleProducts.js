const { Router } = require('express');
const salesProductsController = require('../controllers/salesProducts');
const validateToken = require('../middlewares/tokenValidation');

const salesProductsRouter = Router();

salesProductsRouter.post('/', validateToken, salesProductsController.create);

module.exports = salesProductsRouter;