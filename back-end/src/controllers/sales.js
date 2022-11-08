const salesService = require('../services/sales');

const salesController = {
  getAllSales: async (_req, res) => {
    const sales = await salesService.getAll();
    return res.status(200).json(sales);
  },
  createSale: async (req, res) => {
    const sales = await salesService.create(req.body);

    return res.status(201).json({ id: sales });
  },
  findAll: async (req, res) => {
    const { id } = req.params;
    const sales = await salesService.findAll(id);

    return res.status(200).json(sales);
  }
};

module.exports = salesController;