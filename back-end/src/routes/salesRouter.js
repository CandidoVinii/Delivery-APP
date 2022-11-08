const { Router } = require('express');
const salesController = require('../controllers/sales');
const validateToken = require('../middlewares/tokenValidation');

const salesRouter = Router();

salesRouter.get('/', validateToken, salesController.getAllSales);
salesRouter.get('/:id', validateToken, salesController.findAll);
salesRouter.post('/', validateToken, salesController.createSale);

module.exports = salesRouter;