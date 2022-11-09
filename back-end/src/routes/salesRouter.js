const { Router } = require('express');
const salesController = require('../controllers/sales');
const validateToken = require('../middlewares/tokenValidation');

const salesRouter = Router();

salesRouter.get('/', validateToken, salesController.getAllSales);
salesRouter.get('/:id', validateToken, salesController.findAll);
salesRouter.get('/details/:id', validateToken, salesController.findByPk);
salesRouter.post('/', validateToken, salesController.createSale);
salesRouter.patch('/:id', validateToken, salesController.updateStatus);

module.exports = salesRouter;