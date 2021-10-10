const DataTypes = require('sequelize');
const db = require('../config/db');

module.exports = (db, DataTypes) => {
  const Image = db.define('image', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT(150),
    },
    location: {
      type: DataTypes.TEXT(500),
    },
  });

  // Associations
  Image.associate = models => {
    Image.belongsTo(models.ImageType, {
      foreignKey: 'imageTypeId',
    });
  };

  return Image;
};