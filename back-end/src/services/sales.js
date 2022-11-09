const { sales, users, products } = require('../database/models');

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
    const findSaleId = await sales.findByPk(id, {
      include: [{
        model: users,
        as: 'seller',
        attributes: {
          exclude: ['id', 'email', 'password', 'role']
        },
      },
         {
          model: products,
          as: 'products',
          attributes: {
            exclude: ['id', 'urlImage']
          },
          through: { attributes: ['quantity'] }
        },
      ],
    });

    return findSaleId;
  },
};

module.exports = salesService;