'use strict';
module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define('Admin', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slackId: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  });

  Admin.associate = (models) => {
    Admin.hasMany(models.Checkin, {
      foreignKey: 'adminId',
      as: 'checkins'
    });
  }

  return Admin;
};
