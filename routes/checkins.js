const express = require('express');
const router = express.Router();
const Student = require('../server/models').Student;
const Course = require('../server/models').Course;

router.post('/', (req, res) => {
  if (req.body.token === 'zXvD5nqzIdDweibfwCAtSCPL') {
    Student.findOne({
      where: {slackId: req.body.user_id},
      include: [ Course ]
    })
      .then(result => {
        if (result) {
          let d = new Date()

          if (d.getDay() === 0 || d.getDay() === 6) {
            res.send('No class today. It\'s still the weekend!')
          } else {
            res.send(`Successfully checked in at: ${d.toLocaleTimeString()}`)
          }
        } else {
          res.send('Sorry, you do not appear to be a current student')
        }
      })
  } else {
    res.status(401).send('Unauthorized')
  }
})

module.exports = router;
