'use strict';

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
    { timestamps: false })

  users.associate = (models) => {
    users.hasMany(models.sales,
      { foreignKey: 'id', as: 'userId' });
  };

  users.associate = (models) => {
    users.hasMany(models.sales,
      { foreignKey: 'id', as: 'sellerId' });
  };
  return users;
};
