const { sales } = require('../database/models');

const salesService = {
  getAll: async () => {
    const listAllSales = await sales.findAll();
    return listAllSales;
  },
  create: async (data) => {
    const createSale = await sales.create(data);

    return createSale.dataValues.id;
  },
  findAll: async (userId) => {
    const findSaleId = await sales.findAll({
      where: { userId },
    });

    return findSaleId;
  },
  findByPk: async (id) => {
    const findSaleId = await sales.findByPk(id);

    return findSaleId;
  }
};

module.exports = salesService;