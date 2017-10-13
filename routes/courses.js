const express = require('express');
const router = express.Router();
const { Student, Course, Checkin } = require('../server/models')


router.get('/:id/checkins', (req, res) => {
  Checkin.findAll({
    where: {
      courseId: req.params.id
    }
  }).then(arr => res.send(arr))
})

router.get('/:id', (req, res) => {
  Course.findAll({
    where: {
      id: req.params.id
    }
  }).then(arr => res.send(arr))
})

router.get('/', (req, res) => {
  Course.findAll().then(arr => res.send(arr))
})


module.exports = router;
