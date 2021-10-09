const Sequelize = require('sequelize');

module.exports = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH
});