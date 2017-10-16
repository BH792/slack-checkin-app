const slackToken = process.env.SLACK_TOKEN
const testingSlackToken = process.env.TESTIN_SLACK_TOKEN

module.exports = function slackVerification(req, res, next) {
  if (req.body.token === slackToken || req.body.token === testingSlackToken) {
    req.body.requestTime = new Date()
    next()
  } else {
    res.status(401).send('Unauthorized')
  }
}
