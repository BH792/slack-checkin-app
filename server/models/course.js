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
    })
  }

  return Course;
};
