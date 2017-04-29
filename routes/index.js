var express = require('express');
var router = express.Router();

/* GET home page. */
data = { title: "test", x:0.232}
router.get('/', function(req, res, next) {
  res.render('index', data);
});

module.exports = router;
