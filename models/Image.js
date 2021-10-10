const DataTypes = require('sequelize');
const db = require('../config/db');

module.exports = (db, DataTypes) => {
  const Image = db.define('image', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      //autoIncrement: true,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    imageTypeId: {
      type: DataTypes.INTEGER(150),
      foreignKey: true,
      allowNull: false,
    },
    fileType: {
      type: DataTypes.STRING(50),
      allowNull:false,
    },
  });

  // end of Associations
  Image.associate = models => {
    Image.hasOne(models.ImageType, {
      foreignKey: 'imageTypeId',
      allowNull: false,
    });

    Image.hasMany(models.ImageCopies, {
      foreignKey: "imageId",
    });

  };
  // end of Associations
  return Image;
};

