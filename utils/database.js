const { Sequelize } = require('sequelize');

// new SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

module.exports = sequelize;