'use strict';

module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
      unique: true,
      allowNull: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    saleDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { 
    timestamps: false,
    tableName: 'sales',
    modelName: 'sales',
    underscored: true
  });

  sales.associate = (models) => {
    sales.belongsTo(models.users, { foreignKey: 'userId', as: 'users' });
  };

  return sales;
};
