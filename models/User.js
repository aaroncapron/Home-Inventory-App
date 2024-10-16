const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'User ',
});

module.exports = User;