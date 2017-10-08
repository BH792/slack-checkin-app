const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/checkin', (req, res) => {
  let d = new Date()
  console.log(req)
  res.send(`Successfully checked in at: ${d.toLocaleTimeString()}`)
})

module.exports = router;
