const fetch = require('node-fetch')

class slackWebAPIAdapter {
  constructor() {
    this.baseURL = 'https://slack.com/api/'
    this.token = process.env.SLACK_API_TOKEN || 'xoxp-2727337933-219362225906-257309535558-d927b8ae0eae6b881e92264dac16e9ac'
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

  postResp(responseUrl, message) {
    console.log(responseUrl, message);
    return fetch(responseUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(message)
    })
  }
}

module.exports = slackWebAPIAdapter
