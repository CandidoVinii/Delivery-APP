'use strict';

const sales = require("./sales");

module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('salesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  }, { 
    timestamps: false,
    tableName: 'sales_products',
    modelName: 'salesProducts',
    underscored: true
  });
  
  sales.associate = (models) => {
    models.sales.belongsToMany(models.products, { 
      through: salesProducts,
      as: 'products',
      foreignKey: 'saleId',
      otherKey: 'productId',
    });

    models.products.belongsToMany(models.sales, { 
      through: salesProducts,
      as: 'sales',
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };

  return salesProducts;
};
