module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('Checkin', {
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    courseId: {
      type: DataTypes.INTEGER,
    },
    adminId: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Checkin.associate = (models) => {
    Checkin.belongsTo(models.Student, {
      foreignKey: 'studentId',
    });
    Checkin.belongsTo(models.Course, {
      foreignKey: 'courseId',
    });
    Checkin.belongsTo(models.Admin, {
      foreignKey: 'adminId',
    });
  }

  return Checkin;
};
