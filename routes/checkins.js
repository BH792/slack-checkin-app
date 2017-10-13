const express = require('express');
const router = express.Router();
const { Student, Course, Checkin } = require('../server/models')
const slackVerification = require('../libs/slackTokenVerification')
const adminMenu = require('../libs/slackInteractiveMsg').menu

function admin(req, res, next) {
  console.log(req.body.text);
  if (req.body.text === 'admin') {
    res.json(adminMenu)
  } else {
    next()
  }
}

function findStudent(req, res, next) {
  Student.findOne({
    where: {slackId: req.body.user_id},
    include: [ Course ]
  })
    .then(result => {
      if (result) {
        req.body.student = result
        next()
      } else {
        res.send('Sorry, you do not appear to be a current student. Please speak with your instructor for assistance.')
      }
    })
}

function checkinStudent(req, res, next) {
  Checkin.findOne({
    where: {
      studentId: req.body.student.id,
      date: req.body.requestTime
    }
  })
    .then(result => {
      if (result) {
        res.send(`You have already checked today in at ${result.time.toLocaleTimeString()}`)
      } else {
        next()
      }
    })
}

router.post('/', slackVerification, admin, findStudent, checkinStudent)
router.post('/', (req, res) => {
  let time = req.body.requestTime

  if (time.getDay() === 0 || time.getDay() === 6) {
    res.send('No class today. It\'s still the weekend!')
  } else {
    Checkin.create({
      studentId: req.body.student.id,
      courseId: req.body.student.courseId,
      date: time,
      time: time
    })
    res.send(`Successfully checked in at: ${time.toLocaleTimeString()}`)
  }
})

router.get('/', (res, req) => {
  Checkin.findAll().then(arr => req.send(arr))
})

function timeToDate(time) {
  return new Date(time.getFullYear(), time.getMonth(), time.getDate())
}

const adminInteractiveMessage = {
  "text": "Administrator menu",
  "attachments": [
    {
      "text": "Choose a cohort",
      "fallback": "fallback message",
      "callback_id": "cohort_selection",
      "color": "#3AA3E3",
      "attachment_type": "default",
      "actions": [
        {
          "name": "cohort_list",
          "text": "cohort list",
          "type": "select",
          "options": [
            {
              "text": "web-080717",
              "value": "web-080717"
            },
            {
              "text": "web-082817",
              "value": "web-082817"
            },
            {
              "text": "web-091917",
              "value": "web-091917"
            },
          ]
        }
      ]
    }
  ]
}


module.exports = router;
