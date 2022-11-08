const salesProductService = require('../services/salesProducts');

const salesProductsController = {
  create: async (req, res) => {
    await salesProductService.createSaleProduct(req.body);

    return res.status(201).end();
  },
//  findByPk: async (req, res) => {
//    const { id } = req.params;
//    const saleId = await salesProductService.findByPk(id);
//
//    return res.status(200).json(saleId);
//  },
};

module.exports = salesProductsController;