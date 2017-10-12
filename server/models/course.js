module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  });

  Course.associate = (models) => {
    Course.hasMany(models.Student, {
      foreignKey: 'courseId',
      as: 'students'
    });
    Course.hasMany(models.Checkin, {
      foreignKey: 'courseId',
      as: 'checkins'
    });
  }

  return Course;
};
