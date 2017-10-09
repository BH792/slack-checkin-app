module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slackId: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
  });

  Student.associate = (models) => {
    Student.hasMany(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE'
    })
  }
  return Student;
};