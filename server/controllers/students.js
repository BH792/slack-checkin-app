const Student = require('../models').Student;

module.exports = {
  create(req, res) {
    return Student
      .create({
        name: req.body.name,
        courseId: req.body.courseId,
        slackId: req.body.slackId
      })
      .then(student => res.status(201).send(student))
      .catch(err => res.status(400).send(err));
  }
};
