const { products } = require('../database/products');

const productService = {
  getAll: async () => {
    const listProducts = await products.findAll(
      { attributes: [ "id", "name", "price", "url_image" ] },
    );
    return listProducts;
  },

  getById: async (id) => {
    const product = await users.findOne(
      { attributes: [ "id", "name", "price", "url_image" ] },
    );
    return product;
  },
};

module.exports = productService;
