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

    // Foreign Keys
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      }
    },
    imageTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: ImageType,
        key: 'id',
      }
    },
  });

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