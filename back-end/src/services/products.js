const { products } = require('../database/models');

const productService = {
  getAll: async () => {
    const listProducts = await products.findAll(
      { attributes: ['id', 'name', 'price', 'url_image'] },
    );
    return listProducts;
  },

  getById: async (id) => {
    const product = await products.findOne(
      { 
        where: { id },
        attributes: ['id', 'name', 'price', 'url_image'],
      },
    );
    return product;
  },
};

module.exports = productService;
