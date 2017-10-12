const express = require('express');
const router = express.Router();
const studentsController = require('../server/controllers').students;

const Student = require('../server/models').Student;
/* GET users listing. */
router.get('/', (req, res, next) => {
  Student.findAll({
    where: {
      courseId: 1
    }
  })
    .then(arr => res.send(arr))
});

router.post('/', studentsController.create);

module.exports = router;
