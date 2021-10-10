const DataTypes = require('sequelize');
const db = require('../config/db');

module.exports = (db, DataTypes) => {
  const Settings = db.define('settings', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    folderLocation: {
      type: DataTypes.TEXT(150),
    },
  });

  // Associations
  Settings.associate = models => {
    Settings.belongsTo(models.User, {
      foreignKey: 'userId',
    });

    Settings.hasMany(models.ImageType, {
      foreignKey: 'imageTypeId',
    });
  }

  return Settings;
};