const { Router } = require('express');
const productController = require('../controllers/product');

const productRouter = Router();

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);

module.exports = productRouter;
