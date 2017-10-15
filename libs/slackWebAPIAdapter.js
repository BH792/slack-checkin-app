const fetch = require('node-fetch')

class slackWebAPIAdapter {
  constructor() {
    this.baseURL = 'https://slack.com/api/'
    this.token = process.env.SLACK_API_TOKEN
  }

  channelsList() {
    return this.get('channels.list', {})
  }

  channelsInfo(channelId) {
    return this.get('channels.info', {channel: channelId})
  }

  usersInfo(userId) {
    return this.get('users.info', {user: userId})
  }

  get(slackMethod, params) {
    let urlParams = '?token=' + this.token

    Object.keys(params).forEach(key => {
      urlParams += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    })

    return fetch(this.baseURL + slackMethod + urlParams)
      .then(res => res.json())
  }
}

module.exports = slackWebAPIAdapter
