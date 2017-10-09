const express = require('express');
const router = express.Router();
const studentsController = require('../server/controllers').students;

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/', studentsController.create);

module.exports = router;
