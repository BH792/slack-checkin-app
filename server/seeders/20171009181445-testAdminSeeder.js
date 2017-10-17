module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [
      {
        name: "Bobby Test",
        slackId: 'U7F246ACB',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students', [
      {
        name: 'Bobby Test'
      }
    ])
  }
};
