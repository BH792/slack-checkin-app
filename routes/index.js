const express = require('express');
const router = express.Router();
const Student = require('../server/models').Student;
const Course = require('../server/models').Course;

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
