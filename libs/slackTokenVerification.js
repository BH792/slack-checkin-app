const slackToken = process.env.SLACK_TOKEN || 'oOhkAnYu5MZ8HI8skrTXOzqE'
const testingSlackToken = 'zXvD5nqzIdDweibfwCAtSCPL'

module.exports = function slackVerification(req, res, next) {
  if (req.body.token === slackToken || req.body.token === testingSlackToken) {
    req.body.requestTime = new Date()
    next()
  } else {
    res.status(401).send('Unauthorized')
  }
}
