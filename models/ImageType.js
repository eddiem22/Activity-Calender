const DataTypes = require('sequelize');
const db = require('../config/db');

module.exports = (db, DataTypes) => {
  const ImageType = db.define('imageType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT(150),
    },
  });

  ImageType.associate = models => {
    ImageType.belongsTo(models.Settings);

    ImageType.hasMany(models.Image);
  }

  return ImageType;
};