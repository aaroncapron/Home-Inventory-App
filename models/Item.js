const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

class Item extends Model {}

Item.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Item',
});

module.exports = Item;