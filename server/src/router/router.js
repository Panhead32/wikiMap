var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  if (req.originalUrl) {
    console.log(req.originalUrl);
  }
  next();
});

router.get('/', function(req, res) {
  res.send('Birds home page');
});

router.get('/test', function(req, res) {
  res.send('Birds test page');
});


module.exports = router;