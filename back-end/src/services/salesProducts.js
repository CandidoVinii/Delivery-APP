const { salesProducts } = require('../database/models');

const salesProductService = {
  createSaleProduct: async (data) => {
      await salesProducts.create(data);
  },
//  findByPk: async (id) => {
//    const saleById = await salesProducts.findByPk(id);
//
//    return saleById;
//  }
};

module.exports = salesProductService;