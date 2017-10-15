const express = require('express');
const router = express.Router();
const { Student, Course, Checkin, Admin } = require('../server/models')
const slackVerification = require('../libs/slackTokenVerification')
const interactiveMsg = require('../libs/slackInteractiveMsg')
const slackWebAPIAdapter = require('../libs/slackWebAPIAdapter')

const slackAdapter = new slackWebAPIAdapter()

function setPayloadOnBody(req, res, next) {
  req.body = Object.assign({}, JSON.parse(req.body.payload))
  next()
}

router.post('/', setPayloadOnBody, slackVerification)
router.post('/', (req, res, next) => {
  if (adminMenuRouter[req.body.callback_id]) {
    adminMenuRouter[req.body.callback_id](req, res, next)
  } else {
    res.send('Sorry, that appears to be an invalid request')
  }
})

const adminMenuRouter = {
  adminMenu,
  courseSelection,
  addCohortSelection,
  checkinValidation
}

function adminMenu(req, res, next) {
  if (req.body.actions[0].value === 'addCohort') {
    slackAdapter.channelsList()
      .then(json => {
        const channels = []
        json.channels.forEach(channel => {
          if (channel.name.match(/(\w+-\d{6})/)) {
            channels.push({
              text: channel.name,
              value: channel.id
            })
          }
        })
        res.send(interactiveMsg.addCohort(channels))
      })
  } else if (req.body.actions[0].value === 'cohortSelection') {
    Course.findAll()
      .then(results => {
        let courses = results.map(course => {
          return {
            text: course.name,
            value: course.id
          }
        })
        res.send(interactiveMsg.cohortSelection(courses))
      })
  }
}

function courseSelection(req, res, next) {
  const courseId = req.body.actions[0].selected_options[0].value;
  console.log(courseId);
  Course.findOne({
    where: {id: parseInt(courseId)},
    include: [
      {
        model: Checkin,
        as: 'checkins',
        where: {
          date: req.body.requestTime.toLocaleDateString()
        },
        required: false,
        include: [{all: true}]
      } , {
        model: Student,
        as: 'students'
      }
    ]
  })
    .then(course => {
      if (course) {
        let students = {}
        course.students.map(student => students[student.name] = true)
        let checkins = course.checkins.map(checkin => {

          let name = checkin.Student.name
          let space = checkin.Student.name.length < 42 ?
          ' '.repeat(42 - checkin.Student.name.length) :
          ' '
          let time = checkin.time.toLocaleTimeString()
          let validated = checkin.Admin ? checkin.Admin.name : 'No'
          delete students[name]
          return name + space + time + '   ' + validated
        })
        res.send(interactiveMsg.checkinValidation(course.name, course.id, checkins, Object.keys(students)))
      } else {
        res.send('Sorry, that course was not found')
      }
    })
}

function addCohortSelection(req, res, next) {
  let channelId = req.body.actions[0].selected_options[0].value;

  slackAdapter.channelsInfo(channelId)
    .then(json => {
      let nameDate = json.channel.name.split('-')[1]
      let date = '20' + nameDate.slice(4) + '-' + nameDate.slice(0, 2) + '-' + nameDate.slice(2, 4)
      console.log(date);
      Course.findOrCreate({
        where: {
          name: json.channel.name,
          slackId: json.channel.id,
          startDate: new Date(date)
        }
      })
        .spread((course, created) => {
          console.log(json);
          if (created) {
            json.channel.members.forEach(userId => {
              slackAdapter.usersInfo(userId)
                .then(json => {
                  if (!json.user.is_admin) {
                    Student.findOrCreate({
                      where: {
                        name: json.user.profile.real_name_normalized,
                        slackId: json.user.id,
                        courseId: course.id
                      }
                    })
                  }
                })
            })
            res.send('Initializing cohort')
          } else {
            res.send('Cohort has already been initialized')
          }
        })
    })
}

function checkinValidation(req, res, next) {
  Admin.findOne({
    where: {slackId: req.body.user.id}
  })
    .then(admin => {
      req.adminId = admin.id
      Checkin.update(
        { adminId: req.adminId },
        { where: {
          courseId: req.body.actions[0].value,
          adminId: null
          }
        }
      );
      res.send(`Successfully validated for ${req.body.requestTime.toLocaleDateString()}`)
    })

}

module.exports = router;
