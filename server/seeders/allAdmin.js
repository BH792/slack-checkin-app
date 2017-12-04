const slackWebAPIAdapter = require('../../libs/slackWebAPIAdapter')
const slackAdapter = new slackWebAPIAdapter()
const { Admin } = require('../models')

slackAdapter.token = 'xoxp-2727337933-219362225906-257309535558-d927b8ae0eae6b881e92264dac16e9ac'
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
