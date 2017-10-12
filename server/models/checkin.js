module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('Checkin', {
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
  }

  return Checkin;
};
