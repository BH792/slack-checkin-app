const slackToken = 'zXvD5nqzIdDweibfwCAtSCPL'

module.exports = function slackVerification(req, res, next) {
  if (req.body.token === slackToken) {
    req.body.requestTime = new Date()
    next()
  } else {
    res.status(401).send('Unauthorized')
  }
}