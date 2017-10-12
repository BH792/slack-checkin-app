'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [
      {
        name: "Bobby Test",
        courseId: 1,
        slackId: 'U7F246ACB',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Courses', [
      {
        name: 'Bobby Test'
      }
    ])
  }
};
