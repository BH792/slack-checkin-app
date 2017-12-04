const slackWebAPIAdapter = require('../../libs/slackWebAPIAdapter')
const slackAdapter = new slackWebAPIAdapter()
const { Admin } = require('../models')

slackAdapter.get('users.list', {})
  .then(json => {
    let adminMembers = json.members.filter(member => member.is_admin === true)
    adminMembers.map(admin => {
      Admin.findOrCreate({
        where: {
          slackId: admin.id,
          name: admin.profile.real_name_normalized
        }
      })
    })
    console.log(adminMembers.length);
  })
