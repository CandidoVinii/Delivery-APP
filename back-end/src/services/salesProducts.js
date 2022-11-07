const { salesProducts } = require('../database/models');

const salesProductService = {
  createSaleProduct: async (data) => {
      await salesProducts.create(data);
  },
};

module.exports = salesProductService;