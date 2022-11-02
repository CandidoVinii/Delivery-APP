const { Router } = require('express');
const productController = require('../controllers/product');
const validateToken = require('../middlewares/tokenValidation');

const productRouter = Router();

productRouter.get('/', validateToken, productController.getAll);
productRouter.get('/:id', validateToken, productController.getById);

module.exports = productRouter;
