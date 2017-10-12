const express = require('express');
const router = express.Router();
const { Student, Course, Checkin } = require('../server/models')
const slackVerification = require('../libs/slackTokenVerification')
const interactiveMsg = require('../libs/slackInteractiveMsg')

function setPayloadOnBody(req, res, next) {
  req.body = Object.assign({}, JSON.parse(req.body.payload))
  next()
}

router.post('/', setPayloadOnBody, slackVerification)
router.post('/', (req, res) => {
  const courseName = req.body.actions[0].selected_options[0].value;
  Course.findOne({
    where: {name: courseName},
    include: [
      {
        model: Checkin,
        as: 'checkins',
        where: {
          date: req.body.requestTime.toLocaleDateString()
        },
        include: [Student]
      } , {
        model: Student,
        as: 'students'
      }
    ]
  })
    .then(course => {
      let checkins = course.checkins.map(checkin => {
        // 60 char width message
        let name = checkin.Student.name
        let space = checkin.Student.name.length > 0 ?
                    ' '.repeat(52 - checkin.Student.name.length) :
                    ' '
        let time = checkin.time.toLocaleTimeString()
        return name + space + time
      })
      res.send(interactiveMsg.checkinValidation(courseName, checkins))
    })
})

module.exports = router;