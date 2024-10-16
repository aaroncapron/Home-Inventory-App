const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/database'); // database
const bcrypt = require('bcrypt'); // password hashing

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
    allowNull: false,
    validate: {
      len: [3, 20], // 3 characters <= username <= 20 characters
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
}, {
    sequelize,
    modelName: 'User',
  });
  
  // password hashing hook
  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10)
      .then(hash => {
        user.password = hash;
      })
      .catch(err => {
        throw new Error();
      });
  });
  
  module.exports = User;