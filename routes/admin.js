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
  studentSelection,
  studentUpdateSelection,
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
  } else if (req.body.actions[0].value === 'studentSelection') {
    Student.findAll()
      .then(results => {
        let students = results.map(student => {
          return {
            text: `${student.name} (${student.slackId})`,
            value: `${student.name} (${student.slackId})`
          }
        })
        res.send(interactiveMsg.studentSelection(students))
      })
  }
}

function courseSelection(req, res, next) {
  const courseId = req.body.actions[0].selected_options[0].value;
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
      Course.findOrCreate({
        where: {
          name: json.channel.name,
          slackId: json.channel.id,
          startDate: new Date(date)
        }
      })
        .spread((course, created) => {
          if (created) {
            res.send('Initializing cohort')
            let memberTotal = json.channel.members.length
            let memberCounter = 0
            const delayedResponse = () => {
              memberCounter += 1;
              if (memberCounter === memberTotal) {
                slackAdapter.postResp(req.body.response_url, {text: `${course.name} successfully initialized`})
              }
            }

            json.channel.members.forEach(userId => {
              slackAdapter.usersInfo(userId)
                .then(json => {
                  if (!json.user.is_admin) {
                    Student.findOne({
                      where: {slackId: json.user.id}
                    })
                      .then(student => {
                        if (!student) {
                          Student.create({
                            name: json.user.profile.real_name_normalized,
                            slackId: json.user.id,
                            courseId: course.id
                          }).then(delayedResponse)
                        } else {
                          delayedResponse()
                        }
                      })
                  } else {
                    delayedResponse()
                  }
                })
            })
          } else {
            res.send('Cohort has already been initialized')
          }
        })
    })
}

function studentSelection(req, res, next) {
  const studentValue = req.body.actions[0].selected_options[0].value;
  const studentSlackId = studentValue.split('(')[1].split(')')[0]
  Course.findAll()
    .then(results => {
      let courses = results.map(course => {
        return {
          text: course.name,
          value: `${course.id} ${studentSlackId}`
        }
      })
      courses.unshift({text: 'None', value: `null ${studentSlackId}`})
      res.send(interactiveMsg.studentUpdate(studentValue, courses ))
    })
}

function studentUpdateSelection(req, res, next) {
  const value = req.body.actions[0].selected_options[0].value.split(' ');
  const courseId = value[0] === "null" ? null : value[0]
  const studentSlackId = value[1]
  Student.findOne({
    where: {slackId: studentSlackId}
  })
    .then(student => {
      student.update({
        courseId: courseId
      })
        .then(res.send(`Successfully updated ${student.name}'s course.`))
    })
}

function checkinValidation(req, res, next) {
  Admin.findOne({
    where: {slackId: req.body.user.id}
  })
    .then(admin => {
      if (admin) {
        Checkin.update(
          { adminId: admin.id },
          { where: {
            courseId: req.body.actions[0].value,
            date: req.body.requestTime.toLocaleDateString(),
            adminId: null
            }
          }
        );
        res.send(`Successfully validated for ${req.body.requestTime.toLocaleDateString()}`)
      } else {
        res.send('Sorry, you do not appear to be an admin')
      }
    })
}

module.exports = router;
