const DataTypes = require('sequelize');
const db = require('../config/db');

module.exports = (db, DataTypes) => {
  const ImageType = db.define('imageType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      //autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT(150),
    },
    location: {
      type: DataTypes.TEXT(500),
    }
  });
//Associations
  ImageTypes.associate = models => {
    ImageTypes.belongsTo(models.Image, {
      foreignKey: 'imageTypeid',
    });
  }
  // end of Associations
  return ImageType;
};