const DataTypes = require('sequelize');
const db = require('../config/db');

module.exports = (db, DataTypes) => {
  const User = db.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    ipAddress: {
      type: DataTypes.TEXT(150),
      unique: true,
    },
  });

  User.associate = models => {
    User.hasMany(models.Settings);
  }

  return User;
}