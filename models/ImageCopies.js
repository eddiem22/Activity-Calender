const DataTypes = require('sequelize');
const db = require('../config/db');

module.exports = (db, DataTypes) => {
  const ImageCopies = db.define('ImageCopies', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
     // autoIncrement: true,
      allowNull: false
    },
    imageId: {
      type: DataTypes.TEXT(150),
      foreignKey: true,
    },
    coordinates: {
      type: DataTypes.TEXT(50),
    },
    dateCreated: {
      type: DataTypes.DATE,
  },
  weekTagid: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  }
  });

  // Associations
  ImageCopies.associate = models => {
    ImageCopies.belongsTo(models.Image, {
      foreignKey: 'imageId',
    });

    ImageCopies.belongsTo(models.WeekTag, {
      through: 'weekTagid',
      //allowNull: false,
    });
  }
  // end of Associations
  return ImageCopies;
};