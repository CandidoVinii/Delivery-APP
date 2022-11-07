const salesProductService = require('../services/salesProducts');

const salesProductsController = {
  create: async (req, res) => {
    await salesProductService.createSaleProduct(req.body);

    return res.status(201).end();
  }, 
};

module.exports = salesProductsController;