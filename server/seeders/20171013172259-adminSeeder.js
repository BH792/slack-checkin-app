module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Admins', [
      {
        name: 'Bobby Huang',
        slackId: 'U6FAN6MSN',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alex Griffith',
        slackId: 'U0DQ4N2MN',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Avi Flombaum',
        slackId: 'U02MF382C',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Johann Kerr',
        slackId: 'U1N5V5D6H',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Julian Shapiro',
        slackId: 'U0HPNMUDD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Max Benton',
        slackId: 'U4RFDB146',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'May Cheung',
        slackId: 'U0H793L3H',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rachel Salois',
        slackId: 'U2S7PS41J',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Terrance Koar',
        slackId: 'U51LJ5YLE',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', [
      {
        name: 'Alex Griffith'
      },
      {
        name: 'Avi Flombaum'
      },
      {
        name: 'Johann Kerr'
      },
      {
        name: 'Julian Shapiro'
      },
      {
        name: 'Max Benton'
      },
      {
        name: 'May Cheung'
      },
      {
        name: 'Rachel Salois'
      },
      {
        name: 'Terrance Koar'
      }
    ])
  }
};
