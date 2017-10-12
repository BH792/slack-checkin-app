module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    slackId: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
  });

  Student.associate = (models) => {
    Student.belongsTo(models.Course, {
      foreignKey: 'courseId',
    });
    Student.hasMany(models.Checkin, {
      foreignKey: 'studentId',
      as: 'checkins'
    });
  }
  return Student;
};
