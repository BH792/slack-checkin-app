module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Admins', [
      {
        name: "Bobby Test",
        slackId: 'U7F246ACB',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', [
      {
        name: 'Bobby Test'
      }
    ])
  }
};
