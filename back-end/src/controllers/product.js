const productService = require('../services/products');

const productController = {
  getAll: async (_req, res) => {
    const products = await productService.getAll();
    return res.status(200).json(products);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const product = await productService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product does not exist' });

    return res.status(200).json(product);
  },
};

module.exports = productController;
