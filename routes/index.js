const express = require('express');
const router = express.Router();
const Student = require('../server/models').Student;
const Course = require('../server/models').Course;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/checkin', (req, res) => {
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


`
SELECT "Student".*, "Courses".*
FROM (
  SELECT "Student"."id", "Student"."name", "Student"."courseId", "Student"."slackId", "Student"."createdAt", "Student"."updatedAt"
  FROM "Students" AS "Student" WHERE "Student"."slackId" = 'U7F246ACB'
  LIMIT 1
) AS "Student" LEFT OUTER JOIN "Courses" AS "Courses" ON "Student"."id" = "Courses"."courseId"

`
