const DataTypes = require('sequelize');
const db = require('../config/db');

module.exports = (db, DataTypes) => {
  const WeekTag = db.define('WeekTag', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Description: {
      type: DataTypes.ENUM('This Week', 'Next Week'),
    },
  });
//Associations
WeekTag.associate = models => {
  WeekTag.hasMany(models.ImageCopies, {
    foreignKey: 'weekTagid',
  });

}
  // end of Associations
  return WeekTag;
};